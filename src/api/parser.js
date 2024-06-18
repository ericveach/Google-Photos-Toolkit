export default function parser(data, rpcid) {

  function libraryItemParse(rawItemData) {
    return {
      productId: rawItemData?.[0],
      timestamp: rawItemData?.[2],
      creationTimestamp: rawItemData?.[5],
      mediaId: rawItemData?.[3],
      thumb: rawItemData?.[1]?.[0],
      resWidth: rawItemData?.[1]?.[1],
      resHeight: rawItemData?.[1]?.[2],
      isArchived: rawItemData?.[13],
      isFavorite: rawItemData?.at(-1)?.[163238866]?.[0],
      duration: rawItemData?.at(-1)?.[76647426]?.[0],
      descriptionShort: rawItemData?.at(-1)?.[396644657]?.[0],
      isLivePhoto: rawItemData?.at(-1)?.[146008172] ? true : false,
      livePhotoDuration: rawItemData?.at(-1)?.[146008172]?.[1],
      isOwned: rawItemData[7]?.filter(subArray => subArray.includes(27)).length === 0,
    };
  }

  function libraryTimelinePage(data) {
    return {
      items: data?.[0]?.map(rawItemData => libraryItemParse(rawItemData)),
      nextPageId: data?.[1],
      lastItemTimestamp: parseInt(data?.[2]),
    };
  }

  function libraryGenericPage(data) {
    return {
      items: data?.[0]?.map(rawItemData => libraryItemParse(rawItemData)),
      nextPageId: data?.[1],
    };
  }

  function lockedFolderItemParse(rawItemData) {
    return {
      productId: rawItemData?.[0],
      timestamp: rawItemData?.[2],
      creationTimestamp: rawItemData?.[5],
      mediaId: rawItemData?.[3],
      duration: rawItemData?.at(-1)?.[76647426]?.[0],
    };
  }

  function lockedFolderPage(data) {
    return {
      nextPageId: data?.[0],
      items: data?.[1]?.map(rawItemData => lockedFolderItemParse(rawItemData)),
    };
  }

  function linkParse(rawLinkData) {
    return {
      productId: rawLinkData?.[6],
      linkId: rawLinkData?.[17],
      itemCount: rawLinkData?.[3],
    };
  }

  function linksPage(data) {
    return {
      items: data?.[0]?.map(rawLinkData => linkParse(rawLinkData)),
      nextPageId: data?.[1],
    };
  }

  function albumParse(rawAlbumData) {
    return {
      productId: rawAlbumData?.[0],
      albumId: rawAlbumData?.[6]?.[0],
      name: rawAlbumData?.at(-1)?.[72930366]?.[1],
      itemCount: rawAlbumData?.at(-1)?.[72930366]?.[3],
      isShared: rawAlbumData?.at(-1)?.[72930366]?.[4] || false,
    };
  }

  function albumsPage(data) {
    return {
      items: data?.[0]?.map(rawAlbumData => albumParse(rawAlbumData)),
      nextPageId: data?.[1],
    };
  }

  function albumItemParse(rawItemData) {
    return {
      productId: rawItemData?.[0],
      thumb: rawItemData?.[1]?.[0],
      resWidth: rawItemData[1]?.[1],
      resHeight: rawItemData[1]?.[2],
      timestamp: rawItemData?.[2],
      creationTimestamp: rawItemData?.[5],
      mediaId: rawItemData?.[3],
      isLivePhoto: rawItemData?.at(-1)?.[146008172] ? true : false,
      livePhotoDuration: rawItemData?.at(-1)?.[146008172]?.[1],
      duration: rawItemData?.at(-1)?.[76647426]?.[0],
    };
  }

  function trashItemParse(rawItemData) {
    return {
      productId: rawItemData?.[0],
      thumb: rawItemData?.[1]?.[0],
      resWidth: rawItemData?.[1]?.[1],
      resHeight: rawItemData?.[1]?.[2],
      timestamp: rawItemData?.[2],
      creationTimestamp: rawItemData?.[5],
      mediaId: rawItemData?.[3],
      duration: rawItemData?.at(-1)?.[76647426]?.[0],
    };
  }

  function albumItemsPage(data) {
    return {
      items: data?.[1]?.map(rawItemData => albumItemParse(rawItemData)),
      nextPageId: data?.[2],
    };
  }

  function trashPage(data) {
    return {
      items: data?.[0].map(rawItemData => trashItemParse(rawItemData)),
      nextPageId: data?.[1],
    };
  }

  function itemBulkMediaInfoParse(rawItemData) {
    return {
      productId: rawItemData?.[0],
      descriptionFull: rawItemData?.[1]?.[2],
      fileName: rawItemData?.[1]?.[3],
      timestamp: rawItemData?.[1]?.[6],
      creationTimestamp: rawItemData?.[1]?.[8],
      size: rawItemData?.[1]?.[9],
      takesUpSpace: rawItemData?.[1]?.at(-1)?.[0] === undefined ? null : rawItemData?.[1]?.at(-1)?.[0] === 1,
      spaceTaken: rawItemData?.[1]?.at(-1)?.[1],
      isOriginalQuality: rawItemData?.[1]?.at(-1)?.[2] === undefined ? null : rawItemData?.[1]?.at(-1)?.[2] === 2,
    };
  }

    };
  }

  function bulkMediaInfo(data) {
    return data.map(rawItemData => itemBulkMediaInfoParse(rawItemData));
  }

  if(!data?.length) return null;
  if (rpcid === 'lcxiM') return libraryTimelinePage(data);
  if (rpcid === 'nMFwOc') return lockedFolderPage(data);
  if (rpcid === 'EzkLib') return libraryGenericPage(data);
  if (rpcid === 'F2A0H') return linksPage(data);
  if (rpcid === 'Z5xsfc') return albumsPage(data);
  if (rpcid === 'snAcKc') return albumItemsPage(data);
  if (rpcid === 'zy0IHe') return trashPage(data);
  if (rpcid === 'VrseUb') return itemInfoParse(data);
}