import { Card, CardContent, Modal, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PostForm from "../PostForm";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { toast } from "react-toastify";
import { addPost } from "../../store/thunks/postThunks";
import { IPost } from "../../store/postDTO";

function NewPost() {
  const [createMode, setCreateMode] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useSelector((state: RootState) => state.auth);

  const handleCreateSubmit = async (data: Partial<IPost>) => {
    const tempId = Date.now();
    const newPost = {
      ...data,
      id: tempId,
    };
    if (currentUser) {
      newPost.authorName = currentUser;
    }
    await dispatch(addPost(newPost)).unwrap();
    toast.success("Post created successfully");
    setCreateMode(false);
  };

  return (
    <>
      <Modal open={createMode} onClose={() => setCreateMode(false)}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
          <PostForm formTitle={"Create post"} onSubmit={handleCreateSubmit} />
        </div>
      </Modal>
      <Card
        onClick={() => setCreateMode(true)}
        className="border-2 border-dashed border-darkText content-center !transition-all !bg-transparent !shadow-none hover:!bg-gray-200"
      >
        <CardContent className="flex flex-col items-center text-darkText">
          <AddIcon className="!text-5xl" />
          <Typography variant="h6">Add new post</Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default NewPost;
