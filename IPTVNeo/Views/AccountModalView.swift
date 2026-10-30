import SwiftUI

struct AccountModalView: View {
    @EnvironmentObject var appState: AppState
    @Environment(\.dismiss) var dismiss
    
    @State private var selectedTab: Int = 0 // 0 = Xtream, 1 = M3U, 2 = Manage
    
    // Xtream Fields
    @State private var serverUrl: String = "http://cf.sverige8k.pro"
    @State private var username: String = "b16836b7a227"
    @State private var password: String = "fca112cc11"
    @State private var accountName: String = "Sverige 8K"
    
    // M3U Fields
    @State private var m3uName: String = ""
    @State private var m3uUrl: String = ""
    
    @State private var isSubmitting: Bool = false
    @State private var errorMessage: String? = nil
    
    var body: some View {
        NavigationView {
            ZStack {
                AppTheme.background.ignoresSafeArea()
                
                ScrollView {
                    VStack(spacing: 24) {
                        // Demo Mode Banner
                        VStack(spacing: 12) {
                            HStack {
                                Image(systemName: "sparkles")
                                    .font(.title2)
                                    .foregroundColor(.cyan)
                                VStack(alignment: .leading, spacing: 2) {
                                    Text("Vill du testa direkt?")
                                        .font(.headline)
                                        .foregroundColor(.white)
                                    Text("Starta Demo-läge med nordiska kanaler & filmer")
                                        .font(.caption)
                                        .foregroundColor(AppTheme.textSecondary)
                                }
                                Spacer()
                            }
                            
                            Button(action: {
                                appState.launchDemo()
                                dismiss()
                            }) {
                                HStack {
                                    Image(systemName: "play.fill")
                                    Text("Starta Demo Direkt")
                                        .fontWeight(.semibold)
                                }
                                .frame(maxWidth: .infinity)
                                .padding(.vertical, 12)
                                .background(AppTheme.primaryGradient)
                                .foregroundColor(.white)
                                .cornerRadius(12)
                            }
                        }
                        .padding(16)
                        .glassCard(cornerRadius: 16, borderColor: Color.cyan.opacity(0.3))
                        
                        // Tab Selector
                        Picker("Metod", selection: $selectedTab) {
                            Text("Xtream Codes").tag(0)
                            Text("M3U Spellista").tag(1)
                            Text("Mina Konton").tag(2)
                        }
                        .pickerStyle(.segmented)
                        .padding(.horizontal, 4)
                        
                        if let err = errorMessage {
                            HStack {
                                Image(systemName: "exclamationmark.triangle.fill")
                                    .foregroundColor(.red)
                                Text(err)
                                    .font(.footnote)
                                    .foregroundColor(.white)
                            }
                            .padding(12)
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .background(Color.red.opacity(0.2))
                            .cornerRadius(10)
                        }
                        
                        // Tab 0: Xtream Codes
                        if selectedTab == 0 {
                            VStack(spacing: 16) {
                                customTextField("Kontonamn (t.ex. Mitt IPTV)", text: $accountName, icon: "tag")
                                customTextField("Server URL (http://server:port)", text: $serverUrl, icon: "server.rack")
                                customTextField("Användarnamn", text: $username, icon: "person")
                                customSecureField("Lösenord", text: $password, icon: "lock")
                                
                                Button(action: loginXtream) {
                                    HStack {
                                        if isSubmitting {
                                            ProgressView().tint(.white)
                                        } else {
                                            Image(systemName: "arrow.right.circle.fill")
                                            Text("Spara & Anslut")
                                                .fontWeight(.bold)
                                        }
                                    }
                                    .frame(maxWidth: .infinity)
                                    .padding(.vertical, 14)
                                    .background(AppTheme.primaryGradient)
                                    .foregroundColor(.white)
                                    .cornerRadius(12)
                                }
                                .disabled(isSubmitting || serverUrl.isEmpty || username.isEmpty || password.isEmpty)
                            }
                            .padding(16)
                            .glassCard()
                        }
                        
                        // Tab 1: M3U Playlist
                        if selectedTab == 1 {
                            VStack(spacing: 16) {
                                customTextField("Namn på spellistan", text: $m3uName, icon: "tag")
                                customTextField("M3U URL (http://...)", text: $m3uUrl, icon: "link")
                                
                                Button(action: saveM3U) {
                                    HStack {
                                        Image(systemName: "plus.circle.fill")
                                        Text("Lägg till spellista")
                                            .fontWeight(.bold)
                                    }
                                    .frame(maxWidth: .infinity)
                                    .padding(.vertical, 14)
                                    .background(AppTheme.primaryGradient)
                                    .foregroundColor(.white)
                                    .cornerRadius(12)
                                }
                                .disabled(m3uUrl.isEmpty)
                            }
                            .padding(16)
                            .glassCard()
                        }
                        
                        // Tab 2: Saved Accounts
                        if selectedTab == 2 {
                            VStack(spacing: 12) {
                                if appState.accounts.isEmpty {
                                    Text("Inga sparade konton än.")
                                        .font(.subheadline)
                                        .foregroundColor(AppTheme.textSecondary)
                                        .padding(.vertical, 24)
                                } else {
                                    ForEach(appState.accounts) { acc in
                                        HStack {
                                            VStack(alignment: .leading, spacing: 4) {
                                                HStack(spacing: 6) {
                                                    Text(acc.name)
                                                        .font(.system(size: 15, weight: .bold))
                                                        .foregroundColor(.white)
                                                    if acc.id == appState.activeAccount?.id {
                                                        Text("AKTIV")
                                                            .font(.system(size: 9, weight: .black))
                                                            .padding(.horizontal, 6)
                                                            .padding(.vertical, 2)
                                                            .background(Color.green.opacity(0.8))
                                                            .clipShape(Capsule())
                                                            .foregroundColor(.white)
                                                    }
                                                }
                                                Text(acc.type == .xtream ? "Xtream Codes • \(acc.serverUrl)" : "M3U Spellista")
                                                    .font(.caption)
                                                    .foregroundColor(AppTheme.textSecondary)
                                                    .lineLimit(1)
                                            }
                                            Spacer()
                                            
                                            Button(action: {
                                                appState.switchAccount(acc)
                                                dismiss()
                                            }) {
                                                Image(systemName: "checkmark.circle.fill")
                                                    .font(.title3)
                                                    .foregroundColor(acc.id == appState.activeAccount?.id ? .green : .gray)
                                            }
                                            
                                            Button(action: {
                                                appState.deleteAccount(acc.id)
                                            }) {
                                                Image(systemName: "trash")
                                                    .font(.title3)
                                                    .foregroundColor(.red.opacity(0.8))
                                            }
                                            .padding(.leading, 8)
                                        }
                                        .padding(12)
                                        .glassCard(cornerRadius: 12)
                                    }
                                }
                            }
                        }
                    }
                    .padding(20)
                }
            }
            .navigationTitle("Hantera Konton")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Stäng") { dismiss() }
                        .foregroundColor(AppTheme.primary)
                }
            }
        }
    }
    
    private func loginXtream() {
        isSubmitting = true
        errorMessage = nil
        
        let account = IPTVAccount(
            name: accountName.isEmpty ? "Xtream IPTV" : accountName,
            type: .xtream,
            serverUrl: serverUrl,
            username: username,
            password: password
        )
        
        Task {
            do {
                let auth = try await XtreamService.shared.authenticate(account: account)
                var updated = account
                updated.status = auth.status
                updated.expDate = auth.expDate
                appState.addAccount(updated)
                isSubmitting = false
                dismiss()
            } catch {
                isSubmitting = false
                errorMessage = error.localizedDescription
            }
        }
    }
    
    private func saveM3U() {
        let account = IPTVAccount(
            name: m3uName.isEmpty ? "M3U Spellista" : m3uName,
            type: .m3u,
            m3uUrl: m3uUrl
        )
        appState.addAccount(account)
        dismiss()
    }
    
    private func customTextField(_ placeholder: String, text: Binding<String>, icon: String) -> some View {
        HStack(spacing: 12) {
            Image(systemName: icon)
                .foregroundColor(AppTheme.textSecondary)
                .frame(width: 20)
            TextField(placeholder, text: text)
                .autocapitalization(.none)
                .disableAutocorrection(true)
                .foregroundColor(.white)
        }
        .padding(12)
        .background(Color.white.opacity(0.06))
        .cornerRadius(10)
    }
    
    private func customSecureField(_ placeholder: String, text: Binding<String>, icon: String) -> some View {
        HStack(spacing: 12) {
            Image(systemName: icon)
                .foregroundColor(AppTheme.textSecondary)
                .frame(width: 20)
            SecureField(placeholder, text: text)
                .autocapitalization(.none)
                .foregroundColor(.white)
        }
        .padding(12)
        .background(Color.white.opacity(0.06))
        .cornerRadius(10)
    }
}
