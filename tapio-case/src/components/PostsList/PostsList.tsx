import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import PostItem from "../PostItem";
import { Modal, TextField } from "@mui/material";
import { IPost } from "../../store/postDTO";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchAuthors, fetchPosts } from "../../store/postThunks";
import NewPost from "../NewPost";

const POSTS_PER_PAGE = 6;
const FIRST_PAGE_POSTS = 5;

function PostsList() {
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<IPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } = useSelector(
    (state: RootState) => state.posts
  );
  const totalPages =
    Math.ceil((posts.length - FIRST_PAGE_POSTS) / POSTS_PER_PAGE) + 1;

  useEffect(() => {
    if (!posts.length) {
      dispatch(fetchPosts());
    }
  }, [dispatch, posts.length]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    setPage(page > totalPages ? totalPages : page);
  }, [totalPages, page]);

  useEffect(() => {
    let currentPosts;

    const searchedPosts = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.body.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (page === 1) {
      currentPosts = searchedPosts.slice(0, FIRST_PAGE_POSTS);
    } else {
      const pageOffset = FIRST_PAGE_POSTS + (page - 2) * POSTS_PER_PAGE;
      currentPosts = searchedPosts.slice(
        pageOffset,
        pageOffset + POSTS_PER_PAGE
      );
    }

    setFilteredPosts(currentPosts);
  }, [page, posts, searchQuery]);

  useEffect(() => {
    dispatch(fetchAuthors()).then(() => {
      dispatch(fetchPosts());
    });
  }, [dispatch]);

  return (
    <div className="max-w-6xl mx-auto flex-col justify-items-center">
      {loading ? (
        <CircularProgress className="m-auto" />
      ) : (
        <>
          <TextField
            autoFocus
            className="w-2xl"
            placeholder="Type to search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          ></TextField>
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
            {page === 1 && <NewPost />}
            {filteredPosts.length < 1 ? (
              <div>No posts found</div>
            ) : (
              filteredPosts.map((post) => (
                <PostItem
                  key={post.id}
                  post={post}
                  onClick={() => setSelectedPost(post)}
                />
              ))
            )}
          </div>
          <Modal open={!!selectedPost} onClose={() => setSelectedPost(null)}>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              <h2 className="text-2xl text-lightTurquoise font-semibold mb-1">
                {selectedPost?.title}
              </h2>
              <h3 className="text-darkText font-semibold mb-4">
                {selectedPost?.authorName
                  ? `Author: ${selectedPost?.authorName}`
                  : "Author unknown"}
              </h3>
              <p className="text-darkText">{selectedPost?.body}</p>
            </div>
          </Modal>

          <div className="flex justify-center mt-6">
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, value) => setPage(value)}
              size="large"
              variant="outlined"
              shape="rounded"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#18586d",
                },
                "& .Mui-selected": {
                  backgroundColor: "#18586d !important",
                  color: "white",
                },
                "& .MuiPaginationItem-root:hover": {
                  backgroundColor: "#18586d33",
                },
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default PostsList;
