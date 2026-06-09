// Static Database untuk Pinjaman Online
const DB = {
    // Initial data
    users: [
        {
            id: 1,
            role: "admin",
            username: "admin",
            password: "admin123",
            name: "Administrator",
            email: "admin@pinjaman.com",
            createdAt: "2024-01-01"
        },
        {
            id: 2,
            role: "user",
            username: "john",
            password: "john123",
            name: "John Doe",
            email: "john@email.com",
            phone: "081234567890",
            address: "Jl. Merdeka No. 123",
            nik: "1234567890123456",
            salary: 5000000,
            createdAt: "2024-01-05"
        },
        {
            id: 3,
            role: "user",
            username: "jane",
            password: "jane123",
            name: "Jane Smith",
            email: "jane@email.com",
            phone: "089876543210",
            address: "Jl. Ahmad Yani No. 456",
            nik: "9876543210987654",
            salary: 7500000,
            createdAt: "2024-01-10"
        }
    ],

    loans: [
        {
            id: 1,
            userId: 2,
            amount: 5000000,
            duration: 12,
            interestRate: 12,
            status: "approved",
            purpose: "Modal usaha",
            createdAt: "2024-01-15",
            approvedAt: "2024-01-16",
            approvedBy: 1
        },
        {
            id: 2,
            userId: 3,
            amount: 10000000,
            duration: 24,
            interestRate: 15,
            status: "pending",
            purpose: "Pembelian kendaraan",
            createdAt: "2024-01-18",
            approvedAt: null,
            approvedBy: null
        }
    ],

    payments: [
        {
            id: 1,
            loanId: 1,
            amount: 450000,
            status: "completed",
            dueDate: "2024-02-15",
            paidDate: "2024-02-14",
            createdAt: "2024-01-16"
        }
    ],

    // Initialize data from localStorage jika ada
    init() {
        const savedUsers = localStorage.getItem('db_users');
        const savedLoans = localStorage.getItem('db_loans');
        const savedPayments = localStorage.getItem('db_payments');

        if (savedUsers) this.users = JSON.parse(savedUsers);
        if (savedLoans) this.loans = JSON.parse(savedLoans);
        if (savedPayments) this.payments = JSON.parse(savedPayments);

        this.save();
    },

    // Save data to localStorage
    save() {
        localStorage.setItem('db_users', JSON.stringify(this.users));
        localStorage.setItem('db_loans', JSON.stringify(this.loans));
        localStorage.setItem('db_payments', JSON.stringify(this.payments));
    },

    // Login user
    login(username, password) {
        const user = this.users.find(u => u.username === username && u.password === password);
        if (user) {
            const { password: _, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }
        return null;
    },

    // Get user by ID
    getUserById(id) {
        return this.users.find(u => u.id == id);
    },

    // Get all users (for admin)
    getAllUsers() {
        return this.users.filter(u => u.role === 'user').map(u => {
            const { password, ...userWithoutPassword } = u;
            return userWithoutPassword;
        });
    },

    // Get user loans
    getUserLoans(userId) {
        return this.loans.filter(l => l.userId == userId).map(loan => {
            const payments = this.payments.filter(p => p.loanId === loan.id);
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
    },

    // Submit new loan
    submitLoan(userId, amount, duration, purpose) {
        const newId = Math.max(...this.loans.map(l => l.id), 0) + 1;
        const interestRate = duration > 12 ? 15 : 12;
        
        const newLoan = {
            id: newId,
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
        
        this.loans.push(newLoan);
        this.save();
        return newLoan;
    },

    // Get all loans (for admin)
    getAllLoans() {
        return this.loans.map(loan => {
            const user = this.getUserById(loan.userId);
            const payments = this.payments.filter(p => p.loanId === loan.id);
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
    },

    // Approve loan
    approveLoan(loanId, adminId) {
        const loanIndex = this.loans.findIndex(l => l.id == loanId);
        if (loanIndex === -1) return false;
        
        this.loans[loanIndex].status = 'approved';
        this.loans[loanIndex].approvedAt = new Date().toISOString().split('T')[0];
        this.loans[loanIndex].approvedBy = adminId;
        
        this.save();
        return this.loans[loanIndex];
    },

    // Reject loan
    rejectLoan(loanId) {
        const loanIndex = this.loans.findIndex(l => l.id == loanId);
        if (loanIndex === -1) return false;
        
        this.loans[loanIndex].status = 'rejected';
        
        this.save();
        return this.loans[loanIndex];
    },

    // Add payment
    addPayment(loanId, amount) {
        const newId = Math.max(...this.payments.map(p => p.id), 0) + 1;
        
        const newPayment = {
            id: newId,
            loanId: parseInt(loanId),
            amount: parseInt(amount),
            status: 'completed',
            dueDate: new Date().toISOString().split('T')[0],
            paidDate: new Date().toISOString().split('T')[0],
            createdAt: new Date().toISOString().split('T')[0]
        };
        
        this.payments.push(newPayment);
        this.save();
        return newPayment;
    },

    // Get dashboard stats
    getStats() {
        const users = this.users.filter(u => u.role === 'user');
        const approvedLoans = this.loans.filter(l => l.status === 'approved');
        const pendingLoans = this.loans.filter(l => l.status === 'pending');
        const totalAmount = this.loans.reduce((sum, l) => sum + l.amount, 0);
        const totalPaid = this.payments.reduce((sum, p) => sum + p.amount, 0);
        
        return {
            totalUsers: users.length,
            totalLoans: this.loans.length,
            approvedLoans: approvedLoans.length,
            pendingLoans: pendingLoans.length,
            totalAmount: totalAmount,
            totalPaid: totalPaid
        };
    }
};

// Initialize DB on page load
document.addEventListener('DOMContentLoaded', () => {
    DB.init();
});
