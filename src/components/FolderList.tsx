import Folder from "./Folder";
import { IFolder } from "../types/folder";
import useDataFetch from "../hooks/useFetch";
import config from "../config";

const FolderList = () => {
  const { loading, error, data, refetch } = useDataFetch(
    `${config.baseUrl}/folder-structures`
  );

  // Decide what to render
  let content;
  if (loading) {
    content = <p>Loading...</p>;
  } else if (!loading && error) {
    content = <p>{error}</p>;
  } else if (!loading && !error && data?.length === 0) {
    content = <p>There is no folders</p>;
  } else if (!loading && !error && data && data?.length > 0) {
    const folders = data.map((folder: IFolder) => ({
      ...folder,
      isNotDelete: true,
    }));
    content = folders.map((folder: IFolder) => (
      <Folder key={folder.id} folder={folder} refetch={refetch} />
    ));
  }

  return (
    <>
      <h1>Folder Structure List</h1>
      {content}
    </>
  );
};

export default FolderList;
