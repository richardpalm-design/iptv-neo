import Foundation

class StorageService {
    static let shared = StorageService()
    private let defaults = UserDefaults.standard
    
    private let accountsKey = "iptv_neo_accounts"
    private let activeAccountIdKey = "iptv_neo_active_account_id"
    private let favoritesKey = "iptv_neo_favorites"
    
    func getAccounts() -> [IPTVAccount] {
        guard let data = defaults.data(forKey: accountsKey) else { return [] }
        return (try? JSONDecoder().decode([IPTVAccount].self, from: data)) ?? []
    }
    
    func saveAccount(_ account: IPTVAccount) {
        var accounts = getAccounts()
        if let idx = accounts.firstIndex(where: { $0.id == account.id }) {
            accounts[idx] = account
        } else {
            accounts.append(account)
        }
        if let data = try? JSONEncoder().encode(accounts) {
            defaults.set(data, forKey: accountsKey)
        }
    }
    
    func deleteAccount(id: String) {
        var accounts = getAccounts()
        accounts.removeAll { $0.id == id }
        if let data = try? JSONEncoder().encode(accounts) {
            defaults.set(data, forKey: accountsKey)
        }
        if getActiveAccountId() == id {
            defaults.removeObject(forKey: activeAccountIdKey)
        }
    }
    
    func getActiveAccountId() -> String? {
        return defaults.string(forKey: activeAccountIdKey)
    }
    
    func setActiveAccountId(_ id: String?) {
        if let id = id {
            defaults.set(id, forKey: activeAccountIdKey)
        } else {
            defaults.removeObject(forKey: activeAccountIdKey)
        }
    }
    
    func getFavorites() -> Set<String> {
        let arr = defaults.stringArray(forKey: favoritesKey) ?? []
        return Set(arr)
    }
    
    func toggleFavorite(id: String) {
        var set = getFavorites()
        if set.contains(id) {
            set.remove(id)
        } else {
            set.insert(id)
        }
        defaults.set(Array(set), forKey: favoritesKey)
    }
    
    func isFavorite(id: String) -> Bool {
        return getFavorites().contains(id)
    }
}
