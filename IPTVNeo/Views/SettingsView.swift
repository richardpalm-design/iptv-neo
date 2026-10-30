import SwiftUI

struct SettingsView: View {
    @EnvironmentObject var appState: AppState
    @State private var streamFormat: String = "HLS (.m3u8)"
    @State private var showCacheAlert: Bool = false
    
    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                // Account Card
                VStack(alignment: .leading, spacing: 14) {
                    HStack {
                        Image(systemName: "person.crop.circle.badge.checkmark")
                            .font(.title2)
                            .foregroundColor(AppTheme.primary)
                        VStack(alignment: .leading, spacing: 2) {
                            Text("Aktivt Konto")
                                .font(.footnote)
                                .foregroundColor(AppTheme.textSecondary)
                            Text(appState.activeAccount?.name ?? "Inget konto valt")
                                .font(.headline)
                                .foregroundColor(.white)
                        }
                        Spacer()
                        
                        Button(action: {
                            appState.isAccountModalPresented = true
                        }) {
                            Text("Hantera")
                                .font(.footnote.weight(.bold))
                                .padding(.horizontal, 12)
                                .padding(.vertical, 6)
                                .background(AppTheme.primary)
                                .foregroundColor(.white)
                                .clipShape(Capsule())
                        }
                    }
                    
                    if let acc = appState.activeAccount {
                        Divider().background(Color.white.opacity(0.1))
                        
                        HStack {
                            VStack(alignment: .leading, spacing: 2) {
                                Text("Status").font(.caption).foregroundColor(AppTheme.textSecondary)
                                Text(acc.status).font(.subheadline.weight(.semibold)).foregroundColor(.green)
                            }
                            Spacer()
                            if let exp = acc.expDate {
                                VStack(alignment: .trailing, spacing: 2) {
                                    Text("Giltigt till").font(.caption).foregroundColor(AppTheme.textSecondary)
                                    Text(exp).font(.subheadline.weight(.semibold)).foregroundColor(.white)
                                }
                            }
                        }
                    }
                }
                .padding(18)
                .glassCard(cornerRadius: 18)
                
                // Stream Settings
                VStack(alignment: .leading, spacing: 14) {
                    Text("Uppspelning & Strömning")
                        .font(.headline)
                        .foregroundColor(.white)
                    
                    HStack {
                        Text("Strömformat")
                            .foregroundColor(.white)
                        Spacer()
                        Picker("Strömformat", selection: $streamFormat) {
                            Text("HLS (.m3u8)").tag("HLS (.m3u8)")
                            Text("MPEG-TS (.ts)").tag("MPEG-TS (.ts)")
                        }
                        .pickerStyle(.menu)
                        .tint(AppTheme.primary)
                    }
                    
                    Divider().background(Color.white.opacity(0.1))
                    
                    HStack {
                        Text("Hårdvaruavkodning")
                            .foregroundColor(.white)
                        Spacer()
                        Text("Aktiv (Apple VideoToolbox)")
                            .font(.subheadline)
                            .foregroundColor(.green)
                    }
                }
                .padding(18)
                .glassCard(cornerRadius: 18)
                
                // Storage & Cache
                VStack(alignment: .leading, spacing: 14) {
                    Text("Lagring & Cache")
                        .font(.headline)
                        .foregroundColor(.white)
                    
                    Button(action: {
                        showCacheAlert = true
                    }) {
                        HStack {
                            Text("Rensa bild- och EPG-cache")
                                .foregroundColor(.white)
                            Spacer()
                            Image(systemName: "trash")
                                .foregroundColor(.red.opacity(0.8))
                        }
                    }
                }
                .padding(18)
                .glassCard(cornerRadius: 18)
                
                // App Info
                VStack(spacing: 6) {
                    Text("IPTV Neo v1.0.0 (Native iOS)")
                        .font(.footnote.weight(.semibold))
                        .foregroundColor(AppTheme.textSecondary)
                    Text("Byggd med SwiftUI & Apple AVKit")
                        .font(.caption2)
                        .foregroundColor(AppTheme.textTertiary)
                }
                .padding(.top, 12)
            }
            .padding(20)
            .padding(.bottom, 90)
        }
        .background(AppTheme.background.ignoresSafeArea())
        .alert("Cachen är rensad!", isPresented: $showCacheAlert) {
            Button("OK", role: .cancel) { }
        }
    }
}
