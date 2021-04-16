const router = require('express').Router();
const sandboxController = require('../controllers/sandbox');

router.get('/', sandboxController.listSandboxes)

// there is one to one user to task mapping
// won't allow one user to open multiple sessions/tabs.
// so we can use user_id as task_id.
router.route('/:user_id')
    .get(sandboxController.redirectToTask)
    .delete(sandboxController.cleanupTask)
    // .put(sandboxController.createTask)

// for brower test
router.get('/spawn/:vulnerability', sandboxController.createTask);
// for api
router.put('/spawn/:vulnerability', sandboxController.createTask);

module.exports = router;