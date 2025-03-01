import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Post } from "../../store/postDTO.ts";
import { Button, Modal, Popover, Stack, Typography } from "@mui/material";
import { truncateText } from "../../helpers/index.ts";
import { MouseEvent, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store.ts";
import { deletePost, updatePost } from "../../store/postThunks.ts";
import PostForm from "../PostForm/PostForm.tsx";

interface IPostItemProps {
  post: Post;
  onClick: () => void;
}

function PostItem({ post, onClick }: IPostItemProps) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async (
    id: number,
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    try {
      await dispatch(deletePost(id)).unwrap();
      toast.success("Post deleted successfully");
    } catch (error) {
      toast.error(String(error));
    }
  };
  const handleEdit = (
    isEdit: boolean,
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    setEditMode(isEdit);
  };
  const handleEditSubmit = async (data: Partial<Post>) => {
    setEditMode(false);
    try {
      await dispatch(updatePost({ ...post, ...data })).unwrap();
      toast.success("Post edited successfully");
    } catch (error) {
      toast.error(String(error));
    }
  };

  return (
    <>
      <Modal open={editMode} onClose={() => setEditMode(false)}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
          <PostForm
            formTitle={"Edit post"}
            onSubmit={handleEditSubmit}
            initialData={post}
          />
        </div>
      </Modal>
      <Card
        className="bg-gray-900 shadow-xl rounded-2xl flex flex-col gap-2 cursor-pointer w-full max-h-full min-h-52"
        onClick={onClick}
      >
        <CardContent className="p-6 flex flex-col flex-grow justify-between items-center">
          <h2 className="text-2xl font-semibold text-lightTurquoise mb-2">
            {post.title}
          </h2>
          <p className="text-darkText text-sm">
            {truncateText(post.body, 100)}
          </p>
          <Stack direction="row" spacing={2}>
            <Button
              onClick={(event) => {
                event.stopPropagation();
                setAnchorEl(event.currentTarget);
              }}
              variant="outlined"
              startIcon={<DeleteIcon />}
              sx={{
                color: "#2eb7af",
                borderColor: "#2eb7af",
                "&:hover": {
                  backgroundColor: "#2eb7af",
                  color: "white",
                },
              }}
            >
              Delete
            </Button>
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              transformOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Stack spacing={1} sx={{ p: 2 }}>
                <Typography>Are you sure?</Typography>
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <Button
                    size="small"
                    onClick={(event) => {
                      event.stopPropagation();
                      setAnchorEl(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={(event) => {
                      handleDelete(post.id, event);
                      setAnchorEl(null);
                    }}
                  >
                    Confirm
                  </Button>
                </Stack>
              </Stack>
            </Popover>
            <Button
              onClick={(event) => handleEdit(true, event)}
              variant="outlined"
              startIcon={<EditIcon />}
              sx={{
                color: "#2eb7af",
                borderColor: "#2eb7af",
                "&:hover": {
                  backgroundColor: "#2eb7af",
                  color: "white",
                },
              }}
            >
              Edit
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}

export default PostItem;
