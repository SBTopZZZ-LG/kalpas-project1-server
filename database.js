class Database {
    static db = {}

    static push(email, password) {
        if (email in this.db)
            return;

        this.db[email] = password
    }

    static get(email) {
        return this.db[email] ?? null
    }
}

module.exports = Database