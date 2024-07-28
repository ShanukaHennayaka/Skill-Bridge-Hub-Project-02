export function GetUniqueId(id){
    function generateShortId(objectId) {
      const timestamp = objectId.slice(0, 8);

      const uniquePart = objectId.slice(8);

      const timestampNumber = parseInt(timestamp, 16);

      let hash = 0;
      for (let i = 0; i < uniquePart.length; i++) {
        hash = (hash << 5) - hash + uniquePart.charCodeAt(i);
        hash |= 0;
      }

      const combined = Math.abs(timestampNumber + hash)
        .toString()
        .padStart(12, "0")
        .slice(-12);

      return combined;
    }

    return generateShortId(id)
}