import Foundation

class M3UParser {
    static func parse(content: String) -> (channels: [LiveChannel], categories: [CategoryItem]) {
        var channels: [LiveChannel] = []
        var categoryMap: [String: String] = [:] // id: name
        
        let lines = content.components(separatedBy: .newlines)
        var currentName = ""
        var currentLogo: String? = nil
        var currentGroup = "Allmän"
        var streamIndex = 1
        
        for line in lines {
            let trimmed = line.trimmingCharacters(in: .whitespaces)
            if trimmed.isEmpty { continue }
            
            if trimmed.hasPrefix("#EXTINF:") {
                // Parse attributes
                if let groupRange = trimmed.range(of: "group-title=\"([^\"]+)\"", options: .regularExpression) {
                    let groupAttr = String(trimmed[groupRange])
                    currentGroup = groupAttr.replacingOccurrences(of: "group-title=\"", with: "").replacingOccurrences(of: "\"", with: "")
                } else {
                    currentGroup = "Allmän"
                }
                
                if let logoRange = trimmed.range(of: "tvg-logo=\"([^\"]+)\"", options: .regularExpression) {
                    let logoAttr = String(trimmed[logoRange])
                    currentLogo = logoAttr.replacingOccurrences(of: "tvg-logo=\"", with: "").replacingOccurrences(of: "\"", with: "")
                } else {
                    currentLogo = nil
                }
                
                if let commaIndex = trimmed.lastIndex(of: ",") {
                    let namePart = String(trimmed[trimmed.index(after: commaIndex)...]).trimmingCharacters(in: .whitespaces)
                    currentName = namePart.isEmpty ? "Kanal \(streamIndex)" : namePart
                } else {
                    currentName = "Kanal \(streamIndex)"
                }
            } else if !trimmed.hasPrefix("#") && (trimmed.hasPrefix("http://") || trimmed.hasPrefix("https://")) {
                let categoryId = currentGroup.lowercased().replacingOccurrences(of: " ", with: "_")
                categoryMap[categoryId] = currentGroup
                
                let ch = LiveChannel(
                    id: "m3u_\(streamIndex)",
                    streamId: streamIndex,
                    name: currentName.isEmpty ? "Kanal \(streamIndex)" : currentName,
                    logoUrl: currentLogo,
                    streamUrl: trimmed,
                    categoryId: categoryId,
                    epgTitle: "Livesändning",
                    epgTime: "Just nu",
                    isFavorite: StorageService.shared.isFavorite(id: "m3u_\(streamIndex)")
                )
                channels.append(ch)
                streamIndex += 1
                currentName = ""
                currentLogo = nil
            }
        }
        
        var categories = categoryMap.map { CategoryItem(id: $0.key, name: $0.value) }
        categories.sort { $0.name < $1.name }
        categories.insert(CategoryItem(id: "all", name: "Alla kanaler"), at: 0)
        
        return (channels, categories)
    }
}
