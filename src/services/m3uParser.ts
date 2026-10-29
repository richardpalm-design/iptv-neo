import { LiveCategory, LiveStream } from '../types/iptv';

export interface M3UChannel {
  name: string;
  url: string;
  logo: string;
  group: string;
  tvgId: string;
}

export function parseM3U(content: string): { categories: LiveCategory[]; channels: LiveStream[] } {
  const lines = content.split(/\r?\n/);
  const categoriesMap = new Map<string, string>();
  const channels: LiveStream[] = [];

  let currentInfo: Partial<M3UChannel> | null = null;
  let channelIdCounter = 1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    if (line.startsWith('#EXTINF:')) {
      currentInfo = {};

      // Parse tvg-logo
      const logoMatch = line.match(/tvg-logo="([^"]*)"/i);
      currentInfo.logo = logoMatch ? logoMatch[1] : '';

      // Parse group-title
      const groupMatch = line.match(/group-title="([^"]*)"/i);
      const groupName = groupMatch ? groupMatch[1].trim() : 'Övrigt';
      currentInfo.group = groupName;

      // Register category
      if (!categoriesMap.has(groupName)) {
        const catId = `cat_${categoriesMap.size + 1}`;
        categoriesMap.set(groupName, catId);
      }

      // Parse tvg-id
      const idMatch = line.match(/tvg-id="([^"]*)"/i);
      currentInfo.tvgId = idMatch ? idMatch[1] : '';

      // Parse channel title (after the comma)
      const commaIndex = line.lastIndexOf(',');
      if (commaIndex !== -1) {
        currentInfo.name = line.substring(commaIndex + 1).trim();
      } else {
        currentInfo.name = `Kanal ${channelIdCounter}`;
      }
    } else if (line.startsWith('http://') || line.startsWith('https://')) {
      if (currentInfo) {
        const groupName = currentInfo.group || 'Övrigt';
        const categoryId = categoriesMap.get(groupName) || 'cat_other';

        channels.push({
          num: channelIdCounter,
          name: currentInfo.name || `Kanal ${channelIdCounter}`,
          stream_type: 'live',
          stream_id: channelIdCounter,
          stream_icon: currentInfo.logo || '',
          epg_channel_id: currentInfo.tvgId || '',
          added: '0',
          category_id: categoryId,
          custom_sid: '',
          tv_archive: 0,
          direct_source: line,
          tv_archive_duration: 0,
        });

        channelIdCounter++;
        currentInfo = null;
      }
    }
  }

  const categories: LiveCategory[] = Array.from(categoriesMap.entries()).map(([name, id]) => ({
    category_id: id,
    category_name: name,
  }));

  return { categories, channels };
}
