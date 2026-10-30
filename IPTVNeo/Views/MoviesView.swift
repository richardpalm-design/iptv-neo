import SwiftUI

struct MoviesView: View {
    @EnvironmentObject var appState: AppState
    @State private var selectedMovie: VODMovie? = nil
    
    let columns = [
        GridItem(.flexible(), spacing: 14),
        GridItem(.flexible(), spacing: 14),
        GridItem(.flexible(), spacing: 14)
    ]
    
    var filteredMovies: [VODMovie] {
        appState.movies.filter { mov in
            let matchesCat = appState.selectedMovieCategory == "all" || mov.categoryId == appState.selectedMovieCategory
            let matchesSearch = appState.searchQuery.isEmpty || mov.name.localizedCaseInsensitiveContains(appState.searchQuery)
            return matchesCat && matchesSearch
        }
    }
    
    var body: some View {
        VStack(spacing: 0) {
            // Category pills
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 8) {
                    ForEach(appState.movieCategories) { cat in
                        Button(action: {
                            appState.selectedMovieCategory = cat.id
                        }) {
                            Text(cat.name)
                                .font(.system(size: 13, weight: appState.selectedMovieCategory == cat.id ? .bold : .medium))
                                .padding(.horizontal, 14)
                                .padding(.vertical, 8)
                                .background(appState.selectedMovieCategory == cat.id ? Color.purple : Color.white.opacity(0.08))
                                .foregroundColor(.white)
                                .clipShape(Capsule())
                        }
                    }
                }
                .padding(.horizontal, 16)
                .padding(.vertical, 10)
            }
            .background(Color(hex: "0A0E18"))
            
            // Grid
            ScrollView {
                LazyVGrid(columns: columns, spacing: 16) {
                    ForEach(filteredMovies) { mov in
                        Button(action: {
                            selectedMovie = mov
                        }) {
                            VStack(alignment: .leading, spacing: 6) {
                                ZStack {
                                    RoundedRectangle(cornerRadius: 12)
                                        .fill(Color(hex: "131A29"))
                                        .aspectRatio(2/3, contentMode: .fit)
                                        .overlay(
                                            RoundedRectangle(cornerRadius: 12)
                                                .stroke(Color.white.opacity(0.1), lineWidth: 1)
                                        )
                                    
                                    Image(systemName: "film")
                                        .font(.system(size: 32))
                                        .foregroundColor(.purple.opacity(0.8))
                                    
                                    if let rating = mov.rating {
                                        VStack {
                                            HStack {
                                                Spacer()
                                                HStack(spacing: 2) {
                                                    Image(systemName: "star.fill").font(.system(size: 8))
                                                    Text(rating).font(.system(size: 9, weight: .bold))
                                                }
                                                .padding(.horizontal, 6)
                                                .padding(.vertical, 3)
                                                .background(Color.black.opacity(0.75))
                                                .clipShape(Capsule())
                                                .foregroundColor(.yellow)
                                            }
                                            .padding(6)
                                            Spacer()
                                        }
                                    }
                                }
                                
                                Text(mov.name)
                                    .font(.system(size: 12, weight: .bold))
                                    .foregroundColor(.white)
                                    .lineLimit(1)
                                
                                if let year = mov.year {
                                    Text(year)
                                        .font(.system(size: 10))
                                        .foregroundColor(AppTheme.textSecondary)
                                }
                            }
                        }
                    }
                }
                .padding(16)
                .padding(.bottom, 90)
            }
        }
        .background(AppTheme.background.ignoresSafeArea())
        .sheet(item: $selectedMovie) { mov in
            movieDetailSheet(mov)
        }
    }
    
    private func movieDetailSheet(_ mov: VODMovie) -> some View {
        ZStack {
            AppTheme.background.ignoresSafeArea()
            
            VStack(spacing: 20) {
                // Poster
                ZStack {
                    RoundedRectangle(cornerRadius: 16)
                        .fill(Color(hex: "131A29"))
                        .frame(width: 140, height: 210)
                    Image(systemName: "film")
                        .font(.system(size: 48))
                        .foregroundColor(.purple)
                }
                .padding(.top, 24)
                
                VStack(spacing: 8) {
                    Text(mov.name)
                        .font(.title2.weight(.bold))
                        .foregroundColor(.white)
                        .multilineTextAlignment(.center)
                    
                    HStack(spacing: 12) {
                        if let year = mov.year {
                            Text(year).foregroundColor(AppTheme.textSecondary)
                        }
                        if let rating = mov.rating {
                            HStack(spacing: 4) {
                                Image(systemName: "star.fill").foregroundColor(.yellow)
                                Text(rating).fontWeight(.bold).foregroundColor(.white)
                            }
                        }
                    }
                    .font(.footnote)
                }
                
                if let plot = mov.plot {
                    Text(plot)
                        .font(.footnote)
                        .foregroundColor(AppTheme.textSecondary)
                        .multilineTextAlignment(.center)
                        .padding(.horizontal, 24)
                }
                
                Button(action: {
                    selectedMovie = nil
                    appState.playMovie(mov)
                }) {
                    HStack(spacing: 8) {
                        Image(systemName: "play.fill")
                        Text("Spela Film")
                            .fontWeight(.bold)
                    }
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 14)
                    .background(AppTheme.primaryGradient)
                    .foregroundColor(.white)
                    .cornerRadius(12)
                }
                .padding(.horizontal, 24)
                
                Spacer()
            }
        }
    }
}
