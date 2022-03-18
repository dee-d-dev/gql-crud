exports.Subscription = {
  post: {
    subscribe: (_, __, { pubsub }) => {
      pubsub.asyncIterator("NEW_POST");
    }
  },
};
