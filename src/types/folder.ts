export type IFolder = {
  id: string;
  isNotDelete?: boolean;
  folderId?: string;
  folderName: string;
  children: IFolder[];
};
