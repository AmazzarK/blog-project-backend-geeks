const express = require('express');
const router  = express.Router();
const cloudinary = require('../utils/cloudinary');
const upload = require('../middleware/multer');

/**
 * POST /api/upload
 * req.file comes from <input type="file" name="image" />
 */
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: 'No file' });

    // Convert buffer to base64‐data‑uri so Cloudinary can read it
    const dataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
      'base64'
    )}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: 'blog-images',          // optional: keep uploads tidy
      resource_type: 'image',
    });

    return res.json({ url: result.secure_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Upload failed' });
  }
});

module.exports = router;