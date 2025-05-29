  function CountTotalComments  (comments: any[])  {
    let count = 0;
    const visited = new Set();

    const dfs = (commentList: any[]) => {
      for (const comment of commentList) {
        if (!visited.has(comment.id)) {
          visited.add(comment.id);
          count++;
          if (comment.childComments?.length) {
            dfs(comment.childComments);
          }
        }
      }
    };

    dfs(comments);
    return count;
  };

  export default CountTotalComments;