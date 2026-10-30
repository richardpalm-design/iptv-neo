import SwiftUI

struct HomeView: View {
    @EnvironmentObject var appState: AppState
    
    var body: some View {
        ScrollView {
            VStack(spacing: 24) {
                // Header Bar
                HStack {
                    VStack(alignment: .leading, spacing: 2) {
                        Text("IPTV NEO")
                            .font(.system(size: 24, weight: .black, design: .rounded))
                            .foregroundStyle(AppTheme.primaryGradient)
                        Text(appState.activeAccount?.name ?? "Inget konto")
                            .font(.caption)
                            .foregroundColor(AppTheme.textSecondary)
                    }
                    Spacer()
                    
                    Button(action: {
                        appState.isAccountModalPresented = true
                    }) {
                        HStack(spacing: 6) {
                            Image(systemName: "person.crop.circle.fill")
                            Text("Byt konto")
                                .font(.footnote.weight(.semibold))
                        }
                        .padding(.horizontal, 12)
                        .padding(.vertical, 6)
                        .background(Color.white.opacity(0.1))
                        .clipShape(Capsule())
                        .foregroundColor(.white)
                    }
                }
                .padding(.horizontal, 20)
                .padding(.top, 10)
                
                // Hero Banner
                if let hero = appState.movies.first {
                    VStack(alignment: .leading, spacing: 12) {
                        HStack {
                            Text("UTVALD FILM")
                                .font(.system(size: 10, weight: .black))
                                .padding(.horizontal, 8)
                                .padding(.vertical, 3)
                                .background(AppTheme.primary)
                                .clipShape(Capsule())
                                .foregroundColor(.white)
                            Spacer()
                            if let rating = hero.rating {
                                HStack(spacing: 4) {
                                    Image(systemName: "star.fill").foregroundColor(.yellow)
                                    Text(rating).fontWeight(.bold)
                                }
                                .font(.caption)
                                .foregroundColor(.white)
                            }
                        }
                        
                        Text(hero.name)
                            .font(.system(size: 22, weight: .bold))
                            .foregroundColor(.white)
                            .lineLimit(2)
                        
                        if let plot = hero.plot {
                            Text(plot)
                                .font(.footnote)
                                .foregroundColor(AppTheme.textSecondary)
                                .lineLimit(2)
                        }
                        
                        Button(action: {
                            appState.playMovie(hero)
                        }) {
                            HStack(spacing: 8) {
                                Image(systemName: "play.fill")
                                Text("Spela Nu")
                                    .fontWeight(.bold)
                            }
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 12)
                            .background(AppTheme.primaryGradient)
                            .foregroundColor(.white)
                            .cornerRadius(12)
                        }
                    }
                    .padding(20)
                    .glassCard(cornerRadius: 20, borderColor: AppTheme.primary.opacity(0.4))
                    .padding(.horizontal, 20)
                }
                
                // Quick Category Shortcuts
                HStack(spacing: 12) {
                    categoryShortcut(title: "Live TV", count: "\(appState.channels.count)", icon: "tv.fill", gradient: AppTheme.primaryGradient)
                    categoryShortcut(title: "Filmer", count: "\(appState.movies.count)", icon: "film.fill", gradient: AppTheme.purpleGradient)
                    categoryShortcut(title: "Favoriter", count: "\(appState.channels.filter { $0.isFavorite }.count)", icon: "star.fill", gradient: AppTheme.redGradient)
                }
                .padding(.horizontal, 20)
                
                // Favorite / Popular Channels Row
                VStack(alignment: .leading, spacing: 12) {
                    HStack {
                        Text("Populära Kanaler")
                            .font(.title3.weight(.bold))
                            .foregroundColor(.white)
                        Spacer()
                    }
                    .padding(.horizontal, 20)
                    
                    ScrollView(.horizontal, showsIndicators: false) {
                        LazyHStack(spacing: 14) {
                            ForEach(appState.channels.prefix(10)) { ch in
                                Button(action: {
                                    appState.playChannel(ch)
                                }) {
                                    VStack(alignment: .leading, spacing: 8) {
                                        ZStack {
                                            RoundedRectangle(cornerRadius: 12)
                                                .fill(Color(hex: "131826"))
                                                .frame(width: 140, height: 90)
                                                .overlay(
                                                    RoundedRectangle(cornerRadius: 12)
                                                        .stroke(Color.white.opacity(0.1), lineWidth: 1)
                                                )
                                            
                                            Image(systemName: "tv")
                                                .font(.system(size: 28))
                                                .foregroundColor(AppTheme.primary)
                                            
                                            VStack {
                                                HStack {
                                                    Circle().fill(Color.red).frame(width: 6, height: 6)
                                                    Text("LIVE")
                                                        .font(.system(size: 8, weight: .black))
                                                        .foregroundColor(.white)
                                                    Spacer()
                                                }
                                                .padding(8)
                                                Spacer()
                                            }
                                        }
                                        .frame(width: 140, height: 90)
                                        
                                        Text(ch.name)
                                            .font(.system(size: 13, weight: .bold))
                                            .foregroundColor(.white)
                                            .lineLimit(1)
                                            .frame(width: 140, alignment: .leading)
                                        
                                        Text(ch.epgTitle ?? "Livesändning")
                                            .font(.caption2)
                                            .foregroundColor(AppTheme.textSecondary)
                                            .lineLimit(1)
                                            .frame(width: 140, alignment: .leading)
                                    }
                                }
                            }
                        }
                        .padding(.horizontal, 20)
                    }
                }
                
                // Trending Movies Row
                VStack(alignment: .leading, spacing: 12) {
                    HStack {
                        Text("Senaste Filmer")
                            .font(.title3.weight(.bold))
                            .foregroundColor(.white)
                        Spacer()
                    }
                    .padding(.horizontal, 20)
                    
                    ScrollView(.horizontal, showsIndicators: false) {
                        LazyHStack(spacing: 14) {
                            ForEach(appState.movies) { mov in
                                Button(action: {
                                    appState.playMovie(mov)
                                }) {
                                    VStack(alignment: .leading, spacing: 8) {
                                        ZStack {
                                            RoundedRectangle(cornerRadius: 12)
                                                .fill(Color(hex: "131826"))
                                                .frame(width: 120, height: 170)
                                                .overlay(
                                                    RoundedRectangle(cornerRadius: 12)
                                                        .stroke(Color.white.opacity(0.1), lineWidth: 1)
                                                )
                                            
                                            Image(systemName: "film")
                                                .font(.system(size: 32))
                                                .foregroundColor(.purple)
                                        }
                                        .frame(width: 120, height: 170)
                                        
                                        Text(mov.name)
                                            .font(.system(size: 13, weight: .bold))
                                            .foregroundColor(.white)
                                            .lineLimit(1)
                                            .frame(width: 120, alignment: .leading)
                                    }
                                }
                            }
                        }
                        .padding(.horizontal, 20)
                    }
                }
            }
            .padding(.bottom, 90)
        }
        .background(AppTheme.background.ignoresSafeArea())
    }
    
    private func categoryShortcut(title: String, count: String, icon: String, gradient: LinearGradient) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            Image(systemName: icon)
                .font(.title3)
                .foregroundColor(.white)
            Text(title)
                .font(.system(size: 14, weight: .bold))
                .foregroundColor(.white)
            Text("\(count) st")
                .font(.caption2)
                .foregroundColor(.white.opacity(0.8))
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(14)
        .background(gradient)
        .cornerRadius(14)
    }
}
