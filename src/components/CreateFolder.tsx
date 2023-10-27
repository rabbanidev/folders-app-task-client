import { useState, useEffect } from "react";
import { IFolder } from "../types/folder";
import { Link, useParams } from "react-router-dom";
import useDataFetch from "../hooks/useFetch";
import { usePost } from "../hooks/usePost";
import config from "../config";

const CreateFolder = () => {
  const { id } = useParams();
  const [folderName, setFolderName] = useState<string>("");
  const { loading, error, data } = useDataFetch(
    `${config.baseUrl}/folder-structures/${id as string}`
  );

  const {
    loading: postLoading,
    error: postError,
    success: postSuccess,
    postFunc,
  } = usePost(`${config.baseUrl}/folder-structures/create`);

  // Submit Handler
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { folderName, folderId: id };
    await postFunc(payload);
  };

  // Form Value reset
  useEffect(() => {
    if (postSuccess) {
      setFolderName("");
    }
  }, [postSuccess]);

  // Decide what to render
  let content;
  if (loading) {
    content = <p>Loading...</p>;
  } else if (!loading && error) {
    content = <p>{error}</p>;
  } else if (!loading && !error && !data) {
    content = <p>Folder ID Invalid</p>;
  } else {
    const folder = data as unknown as IFolder;
    content = (
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1>Add Folder in `{folder.folderName}`</h1>
        <form style={{ marginTop: "20px" }} onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Folder name"
            style={{ padding: "5px" }}
            value={folderName}
            required
            onChange={(e) => setFolderName(e.target.value)}
          />
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Link to="/">Cancel</Link>
            <button
              type="submit"
              style={{ marginLeft: "10px" }}
              disabled={postLoading}
            >
              {postLoading ? "Loading..." : "Create"}
            </button>
          </div>
          {postError && <p>{postError}</p>}
          {postSuccess && <p>Folder Create successfully</p>}
        </form>
      </div>
    );
  }

  return content;
};

export default CreateFolder;
