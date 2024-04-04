const router = require('express').Router();
const { Story } = require('../../../../../../15-Project-2/Models');
const Story = require('../../models/Story');

// route to create/add a dish
router.post('/', async (req, res) => {
  try {
    const storyData = await Story.create({
      user_story: req.body.user_story,
      user_name: req.body.user_name,
   
    });
    res.status(200).json(dishData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// According to MVC, what is the role of this action method?
// This action method is the Controller. It accepts input and sends data to the Model and the View.
router.put('/:id', async (req, res) => {
  // Where is this action method sending the data from the body of the fetch request? Why?
  // It is sending the data to the Model so that one dish can be updated with new data in the database.
  try {
    const story = await Story.update(
      {
        user_story: req.body.user_story,
        user_name: req.body.user_name,
       
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    // If the database is updated successfully, what happens to the updated data below?
    // The updated data (dish) is then sent back to handler that dispatched the fetch request.
    res.status(200).json(dish);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
