import SwiftUI

struct LiveTVView: View {
    @EnvironmentObject var appState: AppState
    
    var filteredChannels: [LiveChannel] {
        appState.channels.filter { ch in
            let matchesCategory = appState.selectedLiveCategory == "all" || ch.categoryId == appState.selectedLiveCategory
            let matchesSearch = appState.searchQuery.isEmpty || ch.name.localizedCaseInsensitiveContains(appState.searchQuery)
            let matchesFav = !appState.showFavoritesOnly || ch.isFavorite
            return matchesCategory && matchesSearch && matchesFav
        }
    }
    
    var body: some View {
        VStack(spacing: 0) {
            // Top Navigation Bar with Back Button
            HStack {
                Button(action: {
                    let impact = UIImpactFeedbackGenerator(style: .light)
                    impact.impactOccurred()
                    appState.selectedTab = 0
                }) {
                    HStack(spacing: 4) {
                        Image(systemName: "chevron.left")
                            .font(.system(size: 14, weight: .bold))
                        Text("Startsida")
                            .font(.system(size: 14, weight: .semibold))
                    }
                    .foregroundColor(AppTheme.primary)
                    .padding(.vertical, 6)
                    .padding(.horizontal, 10)
                    .background(Color.white.opacity(0.06))
                    .cornerRadius(8)
                }
                Spacer()
                Text("Live TV")
                    .font(.headline)
                    .foregroundColor(.white)
                Spacer()
                Color.clear.frame(width: 80, height: 1)
            }
            .padding(.horizontal, 16)
            .padding(.top, 8)
            .padding(.bottom, 6)
            
            // Search & Filter Bar
            VStack(spacing: 12) {
                HStack(spacing: 12) {
                    HStack(spacing: 8) {
                        Image(systemName: "magnifyingglass")
                            .foregroundColor(AppTheme.textSecondary)
                        TextField("Sök bland kanaler...", text: $appState.searchQuery)
                            .foregroundColor(.white)
                    }
                    .padding(10)
                    .background(Color.white.opacity(0.08))
                    .cornerRadius(10)
                    
                    Button(action: {
                        let impact = UIImpactFeedbackGenerator(style: .medium)
                        impact.impactOccurred()
                        appState.showFavoritesOnly.toggle()
                    }) {
                        Image(systemName: appState.showFavoritesOnly ? "star.fill" : "star")
                            .font(.system(size: 16, weight: .bold))
                            .foregroundColor(appState.showFavoritesOnly ? .yellow : .white)
                            .padding(10)
                            .background(appState.showFavoritesOnly ? Color.yellow.opacity(0.2) : Color.white.opacity(0.08))
                            .cornerRadius(10)
                    }
                }
                .padding(.horizontal, 16)
                
                // Categories Horizontal Scroll
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 8) {
                        ForEach(appState.liveCategories) { cat in
                            Button(action: {
                                appState.selectedLiveCategory = cat.id
                            }) {
                                Text(cat.name)
                                    .font(.system(size: 13, weight: appState.selectedLiveCategory == cat.id ? .bold : .medium))
                                    .padding(.horizontal, 14)
                                    .padding(.vertical, 8)
                                    .background(appState.selectedLiveCategory == cat.id ? AppTheme.primary : Color.white.opacity(0.08))
                                    .foregroundColor(.white)
                                    .clipShape(Capsule())
                            }
                        }
                    }
                    .padding(.horizontal, 16)
                }
            }
            .padding(.vertical, 10)
            .background(Color(hex: "0A0E18"))
            
            // Channels List
            if filteredChannels.isEmpty {
                VStack(spacing: 12) {
                    Spacer()
                    Image(systemName: "tv.slash")
                        .font(.system(size: 40))
                        .foregroundColor(AppTheme.textTertiary)
                    Text("Inga kanaler matchade din sökning")
                        .font(.headline)
                        .foregroundColor(AppTheme.textSecondary)
                    Spacer()
                }
            } else {
                ScrollView {
                    LazyVStack(spacing: 8) {
                        ForEach(filteredChannels) { ch in
                            Button(action: {
                                appState.playChannel(ch)
                            }) {
                                HStack(spacing: 14) {
                                    // Logo Placeholder
                                    ZStack {
                                        RoundedRectangle(cornerRadius: 8)
                                            .fill(Color(hex: "131A29"))
                                            .frame(width: 48, height: 48)
                                        Image(systemName: "tv.fill")
                                            .font(.system(size: 20))
                                            .foregroundColor(AppTheme.primary)
                                    }
                                    
                                    // Name & EPG
                                    VStack(alignment: .leading, spacing: 3) {
                                        Text(ch.name)
                                            .font(.system(size: 15, weight: .bold))
                                            .foregroundColor(.white)
                                            .lineLimit(1)
                                        
                                        HStack(spacing: 6) {
                                            Circle().fill(Color.red).frame(width: 5, height: 5)
                                            Text(ch.epgTitle ?? "Livesändning")
                                                .font(.caption)
                                                .foregroundColor(AppTheme.textSecondary)
                                                .lineLimit(1)
                                        }
                                    }
                                    
                                    Spacer()
                                    
                                    // Favorite Star
                                    Button(action: {
                                        let impact = UIImpactFeedbackGenerator(style: .light)
                                        impact.impactOccurred()
                                        appState.toggleFavorite(id: ch.id)
                                    }) {
                                        Image(systemName: ch.isFavorite ? "star.fill" : "star")
                                            .foregroundColor(ch.isFavorite ? .yellow : AppTheme.textTertiary)
                                            .padding(8)
                                    }
                                }
                                .padding(12)
                                .glassCard(cornerRadius: 12)
                            }
                        }
                    }
                    .padding(16)
                    .padding(.bottom, 90)
                }
            }
        }
        .background(AppTheme.background.ignoresSafeArea())
    }
}
