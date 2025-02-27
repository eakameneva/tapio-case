import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import { toast } from "react-toastify";

import { useGetAllPostsQuery } from "../api/posts.api";
import { useEffect, useState } from "react";
import { Post } from "../api/postDTO";

const POSTS_PER_PAGE = 6;

function PostsList() {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useGetAllPostsQuery({ page });

  useEffect(() => {
    if (error) {
      toast.error("Error loading posts");
    }
  }, [error]);

  return (
    <div className="max-w-6xl mx-auto">
      {isLoading && <CircularProgress className="m-auto" color="secondary" />}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.posts.map((post: Post) => (
          <Card
            key={post.id}
            className="bg-gray-900 shadow-xl rounded-2xl overflow-hidden "
          >
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-gray-400 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-400 text-sm">{post.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Pagination
          count={data?.total ? Math.ceil(data.total / POSTS_PER_PAGE) : 10}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="secondary"
          size="large"
          variant="outlined"
          shape="rounded"
        />
      </div>
    </div>
  );
}

export default PostsList;
