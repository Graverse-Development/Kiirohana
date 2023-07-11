import AsyncStorage from "@react-native-async-storage/async-storage";

export const getNovels = async () => {
  try {
    const novels = await AsyncStorage.getItem("novels");
    return novels ? JSON.parse(novels) : [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getNovel = async (name, ext) => {
  try {
    const novels = await getNovels();
    const novel = novels.find(
      (novel) => novel.name === name && novel.ext === ext
    );
    return novel ? novel : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const setNovel = async (name, ext, data) => {
  try {
    const novels = await getNovels();
    const updatedNovels = [...novels];
    const novelIndex = novels.findIndex(
      (novel) => novel.name === name && novel.ext === ext
    );

    if (novelIndex !== -1) {
      // Update existing novel
      updatedNovels[novelIndex].data = data;
    } else {
      // Add new novel
      updatedNovels.push({ name, ext, data });
    }

    await AsyncStorage.setItem("novels", JSON.stringify(updatedNovels));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const addFavorite = async (name, ext) => {
  try {
    const novel = await getNovel(name, ext);
    if (novel) {
      novel.favorite = true;
      await setNovel(name, ext, novel.data);
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const removeBookmark = async (name, ext) => {
  try {
    const novel = await getNovel(name, ext);
    if (novel) {
      novel.favorite = false;
      await setNovel(name, ext, novel.data);
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
