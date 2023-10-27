/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { BiRightArrow, BiDownArrow, BiPlus, BiX } from "react-icons/bi";
import { Link } from "react-router-dom";
import { IFolder } from "../types/folder";
import { useDataDelete } from "../hooks/useDelete";
import config from "../config";

type IProps = {
  folder: IFolder;
  refetch: () => void;
};

function Folder({ folder, refetch }: IProps) {
  const [expand, setExpand] = useState<boolean>(false);
  const { deleteFunc, success } = useDataDelete(
    `${config.baseUrl}/folder-structures/delete`
  );

  const toggleHandler = () => {
    setExpand(!expand);
  };

  const deleteHandler = async (id: string) => {
    if (confirm(`Delete ${folder.folderName}`)) {
      await deleteFunc(id);
    }
  };

  // Data gets after delete
  useEffect(() => {
    if (success) {
      refetch();
    }
  }, [refetch, success]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "Center" }}>
          <div
            style={{
              margin: "5px 0px",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={toggleHandler}
          >
            {expand ? <BiDownArrow /> : <BiRightArrow />}
            {folder.folderName}
          </div>
          {!folder?.isNotDelete && (
            <span
              style={{
                marginTop: "5px",
                marginLeft: "10px",
                cursor: "pointer",
              }}
              onClick={() => deleteHandler(folder.id)}
            >
              <BiX />
            </span>
          )}
        </div>
        <Link to={`/create/${folder.id}`}>
          <BiPlus /> New
        </Link>
      </div>
      <div style={{ display: expand ? "block" : "none", paddingLeft: 15 }}>
        {folder.children.length > 0 ? (
          folder.children.map((item) => (
            <Folder key={item.id} folder={item} refetch={refetch} />
          ))
        ) : (
          <span style={{ fontSize: "14px" }}> - No Folders</span>
        )}
      </div>
    </div>
  );
}

export default Folder;
