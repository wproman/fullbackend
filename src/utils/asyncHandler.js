const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
export default asyncHandler;

// another way

// const asyncHandler = (fn) => async (req, res, next) =>{
//     try {
//         await fn(req, res, next);
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// }
