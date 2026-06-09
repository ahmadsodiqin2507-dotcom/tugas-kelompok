const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Database paths
const usersPath = path.join(__dirname, '../data/users.json');
const loansPath = path.join(__dirname, '../data/loans.json');
const paymentsPath = path.join(__dirname, '../data/payments.json');

// Helper functions
function readJSON(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    return [];
  }
}

function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function getNextId(arr) {
  return arr.length > 0 ? Math.max(...arr.map(item => item.id)) + 1 : 1;
}

// Routes
// Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const users = readJSON(usersPath);
  
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    const userData = { ...user };
    delete userData.password;
    res.json({ success: true, user: userData });
  } else {
    res.status(401).json({ success: false, message: 'Username atau password salah' });
  }
});

// Logout
app.post('/api/logout', (req, res) => {
  res.json({ success: true, message: 'Berhasil logout' });
});

// Get user loans
app.get('/api/loans/user/:userId', (req, res) => {
  const loans = readJSON(loansPath);
  const userLoans = loans.filter(l => l.userId == req.params.userId);
  
  // Get loan details with payments
  const loansWithPayments = userLoans.map(loan => {
    const payments = readJSON(paymentsPath).filter(p => p.loanId === loan.id);
    const monthlyPayment = loan.amount / loan.duration;
    const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
    
    return {
      ...loan,
      monthlyPayment: Math.round(monthlyPayment),
      totalWithInterest: Math.round(loan.amount + (loan.amount * loan.interestRate / 100)),
      totalPaid: totalPaid,
      payments: payments
    };
  });
  
  res.json(loansWithPayments);
});

// Submit loan request
app.post('/api/loans', (req, res) => {
  const { userId, amount, duration, purpose } = req.body;
  const loans = readJSON(loansPath);
  
  const interestRate = duration > 12 ? 15 : 12;
  
  const newLoan = {
    id: getNextId(loans),
    userId: parseInt(userId),
    amount: parseInt(amount),
    duration: parseInt(duration),
    interestRate: interestRate,
    status: 'pending',
    purpose: purpose,
    createdAt: new Date().toISOString().split('T')[0],
    approvedAt: null,
    approvedBy: null
  };
  
  loans.push(newLoan);
  writeJSON(loansPath, loans);
  
  res.json({ success: true, loan: newLoan });
});

// Get all loans (Admin)
app.get('/api/admin/loans', (req, res) => {
  const loans = readJSON(loansPath);
  const users = readJSON(usersPath);
  
  const loansWithUser = loans.map(loan => {
    const user = users.find(u => u.id === loan.userId);
    const payments = readJSON(paymentsPath).filter(p => p.loanId === loan.id);
    const monthlyPayment = loan.amount / loan.duration;
    const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
    
    return {
      ...loan,
      userName: user ? user.name : 'Unknown',
      userEmail: user ? user.email : '',
      monthlyPayment: Math.round(monthlyPayment),
      totalWithInterest: Math.round(loan.amount + (loan.amount * loan.interestRate / 100)),
      totalPaid: totalPaid,
      paymentCount: payments.length
    };
  });
  
  res.json(loansWithUser);
});

// Approve loan (Admin)
app.put('/api/admin/loans/:id/approve', (req, res) => {
  const loans = readJSON(loansPath);
  const loanIndex = loans.findIndex(l => l.id == req.params.id);
  
  if (loanIndex === -1) {
    return res.status(404).json({ success: false, message: 'Loan not found' });
  }
  
  loans[loanIndex].status = 'approved';
  loans[loanIndex].approvedAt = new Date().toISOString().split('T')[0];
  loans[loanIndex].approvedBy = req.body.adminId;
  
  writeJSON(loansPath, loans);
  
  res.json({ success: true, loan: loans[loanIndex] });
});

// Reject loan (Admin)
app.put('/api/admin/loans/:id/reject', (req, res) => {
  const loans = readJSON(loansPath);
  const loanIndex = loans.findIndex(l => l.id == req.params.id);
  
  if (loanIndex === -1) {
    return res.status(404).json({ success: false, message: 'Loan not found' });
  }
  
  loans[loanIndex].status = 'rejected';
  
  writeJSON(loansPath, loans);
  
  res.json({ success: true, loan: loans[loanIndex] });
});

// Add payment
app.post('/api/payments', (req, res) => {
  const { loanId, amount } = req.body;
  const payments = readJSON(paymentsPath);
  
  const newPayment = {
    id: getNextId(payments),
    loanId: parseInt(loanId),
    amount: parseInt(amount),
    status: 'completed',
    dueDate: new Date().toISOString().split('T')[0],
    paidDate: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString().split('T')[0]
  };
  
  payments.push(newPayment);
  writeJSON(paymentsPath, payments);
  
  res.json({ success: true, payment: newPayment });
});

// Get all users (Admin)
app.get('/api/admin/users', (req, res) => {
  const users = readJSON(usersPath);
  const userData = users.filter(u => u.role === 'user').map(u => {
    const { password, ...userWithoutPassword } = u;
    return userWithoutPassword;
  });
  
  res.json(userData);
});

// Get dashboard stats (Admin)
app.get('/api/admin/stats', (req, res) => {
  const users = readJSON(usersPath);
  const loans = readJSON(loansPath);
  const payments = readJSON(paymentsPath);
  
  const totalUsers = users.filter(u => u.role === 'user').length;
  const totalLoans = loans.length;
  const approvedLoans = loans.filter(l => l.status === 'approved').length;
  const pendingLoans = loans.filter(l => l.status === 'pending').length;
  const totalAmount = loans.reduce((sum, l) => sum + l.amount, 0);
  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
  
  res.json({
    totalUsers,
    totalLoans,
    approvedLoans,
    pendingLoans,
    totalAmount,
    totalPaid
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
