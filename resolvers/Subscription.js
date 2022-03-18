exports.Subscription = {
  new_post: {
    subscribe: (_, __, { pubsub }) => {
      pubsub.asyncIterator("NEW_POST");
    }
  },
};
