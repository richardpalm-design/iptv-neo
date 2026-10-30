import SwiftUI
import AVKit

struct NativeVideoPlayer: UIViewControllerRepresentable {
    let player: AVPlayer

    func makeUIViewController(context: Context) -> AVPlayerViewController {
        let controller = AVPlayerViewController()
        controller.player = player
        controller.showsPlaybackControls = true
        controller.allowsPictureInPicturePlayback = true
        controller.canStartPictureInPictureAutomaticallyFromInline = true
        controller.videoGravity = .resizeAspect
        return controller
    }

    func updateUIViewController(_ uiViewController: AVPlayerViewController, context: Context) {
        if uiViewController.player !== player {
            uiViewController.player = player
        }
    }
}

struct VideoPlayerModalView: View {
    @EnvironmentObject var appState: AppState
    @Environment(\.dismiss) var dismiss
    
    @State private var player: AVPlayer? = nil
    @State private var showChannelDrawer: Bool = false
    @State private var isPlaying: Bool = true
    
    var body: some View {
        ZStack {
            Color.black.ignoresSafeArea()
            
            if let player = player {
                NativeVideoPlayer(player: player)
                    .ignoresSafeArea()
            } else {
                ProgressView()
                    .tint(.white)
                    .scaleEffect(1.5)
            }
            
            // Top HUD Controls
            VStack {
                HStack(alignment: .top) {
                    // Close Button
                    Button(action: {
                        player?.pause()
                        dismiss()
                    }) {
                        Image(systemName: "chevron.down")
                            .font(.system(size: 18, weight: .bold))
                            .foregroundColor(.white)
                            .padding(12)
                            .background(Color.black.opacity(0.6))
                            .clipShape(Circle())
                    }
                    
                    // Title info
                    if let item = appState.nowPlaying {
                        VStack(alignment: .leading, spacing: 4) {
                            HStack(spacing: 8) {
                                if item.isLive {
                                    HStack(spacing: 4) {
                                        Circle().fill(Color.red).frame(width: 8, height: 8)
                                        Text("LIVE")
                                            .font(.system(size: 11, weight: .black))
                                            .foregroundColor(.white)
                                    }
                                    .padding(.horizontal, 8)
                                    .padding(.vertical, 3)
                                    .background(Color.red.opacity(0.85))
                                    .clipShape(Capsule())
                                }
                                
                                Text(item.title)
                                    .font(.system(size: 16, weight: .bold))
                                    .foregroundColor(.white)
                                    .lineLimit(1)
                            }
                            
                            if let sub = item.subtitle {
                                Text(sub)
                                    .font(.system(size: 12))
                                    .foregroundColor(AppTheme.textSecondary)
                                    .lineLimit(1)
                            }
                        }
                        .padding(.leading, 8)
                    }
                    
                    Spacer()
                    
                    // Channel Drawer Toggle (for Live TV)
                    if appState.nowPlaying?.isLive == true {
                        Button(action: {
                            withAnimation(.spring(response: 0.35, dampingFraction: 0.8)) {
                                showChannelDrawer.toggle()
                            }
                        }) {
                            HStack(spacing: 6) {
                                Image(systemName: "tv.fill")
                                Text("Kanaler")
                            }
                            .font(.system(size: 13, weight: .semibold))
                            .foregroundColor(.white)
                            .padding(.horizontal, 12)
                            .padding(.vertical, 8)
                            .background(Color.black.opacity(0.6))
                            .clipShape(Capsule())
                            .overlay(Capsule().stroke(Color.white.opacity(0.2), lineWidth: 1))
                        }
                    }
                }
                .padding(.horizontal, 16)
                .padding(.top, 16)
                
                Spacer()
            }
            
            // Side Channel Zapper Drawer
            if showChannelDrawer {
                HStack {
                    Spacer()
                    VStack(alignment: .leading, spacing: 12) {
                        HStack {
                            Text("Snabbyte kanaler")
                                .font(.system(size: 16, weight: .bold))
                                .foregroundColor(.white)
                            Spacer()
                            Button(action: { showChannelDrawer = false }) {
                                Image(systemName: "xmark.circle.fill")
                                    .font(.title3)
                                    .foregroundColor(AppTheme.textSecondary)
                            }
                        }
                        .padding(.bottom, 8)
                        
                        ScrollView {
                            LazyVStack(spacing: 8) {
                                ForEach(appState.channels) { ch in
                                    Button(action: {
                                        appState.playChannel(ch)
                                        showChannelDrawer = false
                                    }) {
                                        HStack(spacing: 12) {
                                            Circle()
                                                .fill(ch.id == appState.nowPlaying?.id ? AppTheme.primary : Color.white.opacity(0.1))
                                                .frame(width: 8, height: 8)
                                            
                                            Text(ch.name)
                                                .font(.system(size: 14, weight: ch.id == appState.nowPlaying?.id ? .bold : .medium))
                                                .foregroundColor(ch.id == appState.nowPlaying?.id ? AppTheme.primary : .white)
                                                .lineLimit(1)
                                            
                                            Spacer()
                                        }
                                        .padding(.vertical, 8)
                                        .padding(.horizontal, 10)
                                        .background(ch.id == appState.nowPlaying?.id ? AppTheme.primary.opacity(0.15) : Color.clear)
                                        .cornerRadius(8)
                                    }
                                }
                            }
                        }
                    }
                    .padding(16)
                    .frame(width: 280)
                    .background(Color(hex: "0D111A").opacity(0.95))
                    .overlay(Rectangle().stroke(Color.white.opacity(0.1), lineWidth: 1))
                    .transition(.move(edge: .trailing))
                }
                .background(Color.black.opacity(0.4).onTapGesture { showChannelDrawer = false })
            }
        }
        .onAppear {
            setupPlayer()
        }
        .onChange(of: appState.nowPlaying) { _ in
            setupPlayer()
        }
        .onDisappear {
            player?.pause()
            player = nil
        }
    }
    
    private func setupPlayer() {
        guard let item = appState.nowPlaying else { return }
        player?.pause()
        let p = AVPlayer(url: item.streamUrl)
        self.player = p
        p.play()
    }
}
