app.directive('postArea', function() {
  return {
    restrict: 'A',
    scope: false,
    controller: PostCtrl
  };
});

var PostCtrl= ['$scope', '$rootScope', 'Post', 'Comment', 'Error', function($scope, $rootScope, Post, Comment, Error) {
  $scope.posts = [];
  $scope.posts_loading = true;

  $scope.post = {};
  $scope.comment = {};

  if ($rootScope.user) $scope.comment.author = $rootScope.user.username;

  Post.query(function(res) {
    if (!res.success) {
      return Error.add('Server', 'Could not load posts');
    }
    $scope.posts = res.data;
    $scope.posts_loading = false;
    console.log($scope.posts);
  });

  // Post functions
  $scope.submitNewPost = function(title, body, author_id) {
    var post = {
      title: title,
      body: body,
      author_id: author_id
    };
    Post.save(post, function(res) {
      if (!res.success) {
        return Error.add('Server', 'Could not save post');
      }
      $scope.posts.unshift(res.data);
      $scope.post = {};
    });
  }

  $scope.updatePost = function(post) {
    Post.update({ id: post.id }, post, function(res) {
      if (!res.success) {
        return Error.add('Server', 'Could not update post');
      }
      var index = $scope.posts.indexOf(post);
      $scope.posts[index] = res.data;
    });
  }

  $scope.deletePost = function(post) {
    Post.delete({ id: post.id }, function(res) {
      if (!res.success) {
        return Error.add('Server', 'Could not delete post');
      }
      $scope.posts.splice($scope.posts.indexOf(post), 1);
    });
  }

  $scope.upvotePost = function(post) {
    Post.upvote({ id: post.id }, function(res) {
      if (!res.success) {
        return Error.add('Server', 'Could not upvote post');
      }
      res.data.upvoted = true;
      var index = $scope.posts.indexOf(post);
      $scope.posts[index] = res.data;
    });
  }

  $scope.hasUpvoted = function(post) {
    var result = false;
    var ip = $rootScope.ip;

    if (!ip) return true; // Assume users cannot upvote if IP cannot be resolved.

    post.Upvotes.forEach(function(upvote) {
      if (upvote.ip == ip) result = true;
    });
    
    return result;
  }

  $scope.have_posts = function() {
    if ($scope.posts && $scope.posts.length > 0) return true;
    return false;
  }

  $scope.postWasUpdated = function(post) {
    if (post.date_published !== post.date_updated) return true;
    return false;
  }

  // Comment functions
  $scope.submitNewComment = function(body, author, post) {
    var comment = {
      body: body,
      author: author,
    };
    Comment.save({ pid: post.id }, comment, function(res) {
      if (!res.success) {
        return Error.add('Server', 'Could not save comment');
      }
      post.Comments.unshift(res.data);
      $scope.comment.body = '';
    });
  }

  $scope.deleteComment = function(comment, post) {
    Comment.delete({ pid: post.id, cid: comment.id }, function(res) {
      if (!res.success) {
        return Error.add('Server', 'Could not delete comment');
      }
      post.Comments.splice(post.Comments.indexOf(comment), 1);
    });
  }

  $scope.isPostAuthor = function(user, post) {
    if (user.id == post.User.id) return true;
    return false;
  }

  // TinyMCE options
  $scope.tiny_mce_post_options = {
    setup: function(editor) {
      editor.on('init', function() {
        //$scope.tinymce_loading = false; Only works if user is logged in, need to re-implement
      });
    },
    plugins: 'code, codesample, image, imagetools, media, link, anchor, colorpicker, paste, table, textcolor',
    browser_spellcheck: true
  };

  $scope.tiny_mce_title_inline_options = {
    selector: 'h2.editable',
    inline: true,
    menubar: false,
    toolbar: 'undo redo'
  };

  $scope.tiny_mce_body_inline_options = {
    selector: 'div.editable',
    inline: true,
    plugins: 'code, codesample, image, imagetools, media, link, anchor, colorpicker, paste, table, textcolor'
  };

}];