exports.subscription = {
  new_post: {
    subscribe: (_, args, { pubsub }) => {
      pubsub.asyncIterator("NEW_POST");
    }
  },
};
