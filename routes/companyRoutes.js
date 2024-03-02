const express = require('express');
const {
  getAllCompany,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
} = require('../controllers/companyController');

const sessionRouter = require('./sessionRoutes');

const router = express.Router();

const { protect, authorize } = require('../middleware/authMiddleware');

router.use('/:companyId/sessions/', sessionRouter);

router
  .route('/')
  .get(protect, getAllCompany)
  .post(protect, authorize('admin'), createCompany);
router
  .route('/:id')
  .get(protect, getCompany)
  .put(protect, authorize('admin'), updateCompany)
  .delete(protect, authorize('admin'), deleteCompany);

module.exports = router;
