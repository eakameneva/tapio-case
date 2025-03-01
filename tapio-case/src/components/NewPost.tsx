import { Card, CardContent, Modal, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PostForm from "./PostForm";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { toast } from "react-toastify";
import { addPost } from "../store/postThunks";
import { Post } from "../store/postDTO";

function NewPost() {
  const [createMode, setCreateMode] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleCreateSubmit = async (data: Partial<Post>) => {
    try {
      const newPost = { id: Date.now(), ...data };
      await dispatch(addPost(newPost)).unwrap();
      toast.success("Post created successfully");
      setCreateMode(false);
    } catch (error) {
      toast.error(String(error));
    }
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
        className="!bg-transparent !shadow-none border-2 border-dashed border-darkText rounded-2xl gap-2 content-center cursor-pointer !transition-all hover:!bg-gray-200"
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
