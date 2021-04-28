const router = require('express').Router();
const sandboxController = require('../controllers/sandbox');
const { validateIdToken } = require('../middlewares/auth');

router.get('/', sandboxController.listSandboxes);

// there is one to one user to task mapping
// won't allow one user to open multiple sessions/tabs.
// so we can use userId as task_id.

router.use(validateIdToken);

// TODO: below routes are only for backend dev not to be used by UI.
router
  .route('/task')
  .get(sandboxController.redirectToTask)
  .delete(sandboxController.cleanupTask);
// .put(sandboxController.createTask)

// for brower test
router.get('/spawn/:vulnerability', sandboxController.createTask);
// for api
router.put('/spawn/:vulnerability', sandboxController.createTask);

module.exports = router;
