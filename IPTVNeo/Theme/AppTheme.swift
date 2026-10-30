import SwiftUI

struct AppTheme {
    // OLED Dark Glassmorphic Palette
    static let background = Color(hex: "07090E")
    static let cardBackground = Color(hex: "10141E")
    static let cardHover = Color(hex: "171D2C")
    static let glassBorder = Color.white.opacity(0.12)
    static let glassBackground = Color(hex: "121826").opacity(0.75)
    
    // Apple Accent Colors
    static let primary = Color(hex: "0A84FF") // Apple Vivid Blue
    static let primaryGradient = LinearGradient(
        colors: [Color(hex: "00C6FF"), Color(hex: "0072FF")],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
    static let purpleGradient = LinearGradient(
        colors: [Color(hex: "BF5AF2"), Color(hex: "5E5CE6")],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
    static let redGradient = LinearGradient(
        colors: [Color(hex: "FF375F"), Color(hex: "FF453A")],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
    
    // Text Colors
    static let textPrimary = Color.white
    static let textSecondary = Color(white: 0.72)
    static let textTertiary = Color(white: 0.42)
}

extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (255, 0, 0, 0)
        }
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue: Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}

struct GlassCardModifier: ViewModifier {
    var cornerRadius: CGFloat = 16
    var borderColor: Color = AppTheme.glassBorder

    func body(content: Content) -> some View {
        content
            .background(
                RoundedRectangle(cornerRadius: cornerRadius)
                    .fill(AppTheme.glassBackground)
            )
            .overlay(
                RoundedRectangle(cornerRadius: cornerRadius)
                    .stroke(borderColor, lineWidth: 1)
            )
    }
}

extension View {
    func glassCard(cornerRadius: CGFloat = 16, borderColor: Color = AppTheme.glassBorder) -> some View {
        modifier(GlassCardModifier(cornerRadius: cornerRadius, borderColor: borderColor))
    }
}
