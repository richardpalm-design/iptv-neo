import SwiftUI

struct SeriesView: View {
    @EnvironmentObject var appState: AppState
    @State private var selectedSeries: SeriesItem? = nil
    
    let columns = [
        GridItem(.flexible(), spacing: 14),
        GridItem(.flexible(), spacing: 14),
        GridItem(.flexible(), spacing: 14)
    ]
    
    var body: some View {
        ScrollView {
            LazyVGrid(columns: columns, spacing: 16) {
                ForEach(appState.series) { ser in
                    Button(action: {
                        selectedSeries = ser
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
                                
                                Image(systemName: "tv.inset.filled")
                                    .font(.system(size: 32))
                                    .foregroundColor(.cyan)
                            }
                            
                            Text(ser.name)
                                .font(.system(size: 12, weight: .bold))
                                .foregroundColor(.white)
                                .lineLimit(1)
                            
                            Text("\(ser.numSeasons) Säsonger")
                                .font(.system(size: 10))
                                .foregroundColor(AppTheme.textSecondary)
                        }
                    }
                }
            }
            .padding(16)
            .padding(.bottom, 90)
        }
        .background(AppTheme.background.ignoresSafeArea())
        .sheet(item: $selectedSeries) { ser in
            seriesDetailSheet(ser)
        }
    }
    
    private func seriesDetailSheet(_ ser: SeriesItem) -> some View {
        ZStack {
            AppTheme.background.ignoresSafeArea()
            
            VStack(spacing: 20) {
                VStack(spacing: 8) {
                    Text(ser.name)
                        .font(.title2.weight(.bold))
                        .foregroundColor(.white)
                        .padding(.top, 24)
                    
                    if let plot = ser.plot {
                        Text(plot)
                            .font(.footnote)
                            .foregroundColor(AppTheme.textSecondary)
                            .multilineTextAlignment(.center)
                            .padding(.horizontal, 24)
                    }
                }
                
                Text("Avsnitt (Säsong 1)")
                    .font(.headline)
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.horizontal, 24)
                
                ScrollView {
                    VStack(spacing: 10) {
                        ForEach(1...5, id: \.self) { ep in
                            Button(action: {
                                selectedSeries = nil
                                guard let url = URL(string: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4") else { return }
                                appState.nowPlaying = PlayingMediaItem(
                                    id: "ep_\(ep)",
                                    title: "\(ser.name) - S01E0\(ep)",
                                    subtitle: "Avsnitt \(ep)",
                                    streamUrl: url,
                                    posterUrl: nil,
                                    isLive: false
                                )
                                appState.isPlayerPresented = true
                            }) {
                                HStack {
                                    Image(systemName: "play.circle.fill")
                                        .font(.title2)
                                        .foregroundColor(AppTheme.primary)
                                    VStack(alignment: .leading, spacing: 2) {
                                        Text("Avsnitt \(ep)")
                                            .font(.system(size: 15, weight: .semibold))
                                            .foregroundColor(.white)
                                        Text("45 minuter")
                                            .font(.caption)
                                            .foregroundColor(AppTheme.textSecondary)
                                    }
                                    Spacer()
                                }
                                .padding(12)
                                .glassCard(cornerRadius: 12)
                            }
                        }
                    }
                    .padding(.horizontal, 24)
                }
            }
        }
    }
}
