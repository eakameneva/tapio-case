import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IPost } from "../../store/postDTO.ts";
import { Button, Modal, Popover, Stack, Typography } from "@mui/material";
import { truncateText } from "../../helpers/index.ts";
import { MouseEvent, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store.ts";
import { deletePost, updatePost } from "../../store/thunks/postThunks.ts";
import PostForm from "../PostForm/PostForm.tsx";

const MAX_TITLE_LENGTH = 45;
const MAX_TEXT_LENGTH = 90;

interface IPostItemProps {
  post: IPost;
  onClick: () => void;
}

function PostItem({ post, onClick }: IPostItemProps) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleDelete = async (
    id: number,
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    await dispatch(deletePost(id)).unwrap();
    toast.success("Post deleted successfully", {
      role: "alert",
    });
  };
  const handleEdit = (
    isEdit: boolean,
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    setEditMode(isEdit);
  };
  const handleEditSubmit = async (data: Partial<IPost>) => {
    await dispatch(updatePost({ ...post, ...data })).unwrap();
    toast.success("Post edited successfully", {
      role: "alert",
    });
    setEditMode(false);
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
        className="!shadow-xl flex flex-col gap-2 w-full !max-h-full hover:shadow-2xl"
        onClick={(event) => {
          if (anchorEl) {
            event.stopPropagation();
            return;
          }
          onClick();
        }}
      >
        <CardContent className="p-6 flex flex-col flex-grow gap-1 justify-between items-stretch">
          <div>
            <h2 className="text-2xl font-semibold text-lightTurquoise mb-2">
              {truncateText(post.title, MAX_TITLE_LENGTH)}
            </h2>
            <p className="text-darkText text-sm mb-4">
              {truncateText(post.body, MAX_TEXT_LENGTH)}
            </p>
          </div>
          {isAuthenticated && (
            <Stack direction="row" spacing={2}>
              <Button
                onClick={(event) => {
                  event.stopPropagation();
                  setAnchorEl(event.currentTarget);
                }}
                variant="outlined"
                startIcon={<DeleteIcon />}
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
              >
                Edit
              </Button>
            </Stack>
          )}
        </CardContent>
      </Card>
    </>
  );
}

export default PostItem;
