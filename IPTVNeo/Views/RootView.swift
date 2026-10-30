import SwiftUI

struct RootView: View {
    @EnvironmentObject var appState: AppState
    
    var body: some View {
        ZStack(alignment: .bottom) {
            // Main Content Tabs
            TabView(selection: $appState.selectedTab) {
                HomeView()
                    .tag(0)
                
                LiveTVView()
                    .tag(1)
                
                MoviesView()
                    .tag(2)
                
                SeriesView()
                    .tag(3)
                
                SettingsView()
                    .tag(4)
            }
            .tabViewStyle(.page(indexDisplayMode: .never))
            .ignoresSafeArea()
            
            // Floating Mini-Player (if playing and full player minimized)
            VStack(spacing: 8) {
                if let item = appState.nowPlaying, !appState.isPlayerPresented {
                    Button(action: {
                        appState.isPlayerPresented = true
                    }) {
                        HStack(spacing: 12) {
                            Circle()
                                .fill(item.isLive ? Color.red : AppTheme.primary)
                                .frame(width: 8, height: 8)
                            
                            VStack(alignment: .leading, spacing: 2) {
                                Text(item.title)
                                    .font(.system(size: 14, weight: .bold))
                                    .foregroundColor(.white)
                                    .lineLimit(1)
                                if let sub = item.subtitle {
                                    Text(sub)
                                        .font(.caption2)
                                        .foregroundColor(AppTheme.textSecondary)
                                        .lineLimit(1)
                                }
                            }
                            
                            Spacer()
                            
                            Image(systemName: "chevron.up")
                                .font(.footnote.weight(.bold))
                                .foregroundColor(AppTheme.textSecondary)
                        }
                        .padding(.horizontal, 16)
                        .padding(.vertical, 10)
                        .background(Color(hex: "131A29").opacity(0.95))
                        .clipShape(Capsule())
                        .overlay(Capsule().stroke(Color.white.opacity(0.15), lineWidth: 1))
                        .padding(.horizontal, 16)
                        .shadow(color: .black.opacity(0.4), radius: 10, y: 5)
                    }
                }
                
                // Frosted Glass Custom Bottom Tab Bar
                HStack {
                    tabItem(icon: "house.fill", label: "Hem", tag: 0)
                    Spacer()
                    tabItem(icon: "tv.fill", label: "Live TV", tag: 1)
                    Spacer()
                    tabItem(icon: "film.fill", label: "Filmer", tag: 2)
                    Spacer()
                    tabItem(icon: "tv.inset.filled", label: "Serier", tag: 3)
                    Spacer()
                    tabItem(icon: "gearshape.fill", label: "Inställningar", tag: 4)
                }
                .padding(.horizontal, 24)
                .padding(.vertical, 12)
                .background(Color(hex: "0B0F19").opacity(0.95))
                .clipShape(Capsule())
                .overlay(Capsule().stroke(Color.white.opacity(0.12), lineWidth: 1))
                .padding(.horizontal, 16)
                .padding(.bottom, 4)
                .shadow(color: .black.opacity(0.5), radius: 15, y: 5)
            }
        }
        .fullScreenCover(isPresented: $appState.isPlayerPresented) {
            VideoPlayerModalView()
        }
        .sheet(isPresented: $appState.isAccountModalPresented) {
            AccountModalView()
        }
    }
    
    private func tabItem(icon: String, label: String, tag: Int) -> some View {
        Button(action: {
            let impact = UIImpactFeedbackGenerator(style: .light)
            impact.impactOccurred()
            appState.selectedTab = tag
        }) {
            VStack(spacing: 4) {
                Image(systemName: icon)
                    .font(.system(size: 20))
                Text(label)
                    .font(.system(size: 10, weight: appState.selectedTab == tag ? .bold : .medium))
            }
            .foregroundColor(appState.selectedTab == tag ? AppTheme.primary : AppTheme.textSecondary)
            .frame(width: 50)
        }
    }
}
