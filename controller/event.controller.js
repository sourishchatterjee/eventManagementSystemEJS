
// const eventModel = require("../models/eventsModel");
// const Category = require("../models/categoryModel"); 

// class eventController {
//     async create(req, res) {
//         try {
        
//             const categories = await Category.find();
//             res.render('addanevent', { categories });
//         } catch (err) {
//             throw err;
//         }
//     }

//     async addanEvent(req, res) {
//         try {
//             const { title, description, category, eventDate, organizerName } = req.body;
//             const image = req.file?.filename;

//             if (!title) {
//                 console.log("title is Required");
//                 return res.status(400).send("Name is Required");
//             }

//             let addEvent = await eventModel.create({
//                 title,
//                 description,
//                 category,
//                 eventDate,
//                 organizerName,
//                 image,
//             });
// ///
//             if (addEvent) {
//                 console.log("Event Created Successfully", addEvent);
//                 return res.redirect("/admin/allevents");
//             }
//         } catch (error) {
//             throw error;
//         }
//     }


//     async allEvents(req, res) {
//         try {
//             const allevents = await eventModel.find();
//             res.render("allevents", {
//                 allevents,
//             });
//         } catch (error) {
//             console.log(error);
//         }
//     }
    
//     async editEventById(req, res) {
//         try {
//             const eventId = req.params.id;
//             const editEventData = await eventModel.findById(eventId);
            
//             if (!editEventData) {
//                 return res.status(404).send("Event not found");
//             }

//             // Get all categories for the dropdown in edit form
//             const categories = await Category.find();

//             res.render('editevent', { 
//                 editEventData,
//                 categories 
//             });
//         } catch (error) {
//             res.status(404).json({
//                 success: false,
//                 message: "Unable to find the event",
//                 data: error,
//             });
//             console.log(error);
//         }
//     }


//     async updateEvent(req, res) {
//         try {
//             const eventId = req.params.id;
//             const { 
//                 title, 
//                 description, 
//                 category, 
//                 eventDate, 
//                 organizerName, 
//                 currentImage 
//             } = req.body;
            
//             const updateData = {
//                 title,
//                 description,
//                 category,
//                 eventDate,
//                 organizerName
//             };
            
//             if (req.file) {
//                 updateData.image = req.file.filename;
//             }
            
//             const updatedEvent = await eventModel.findByIdAndUpdate(
//                 eventId, 
//                 updateData,
//                 { new: true }
//             );

//             if (updatedEvent) {
//                 return res.redirect("/admin/allevents");
//             } else {
//                 return res.status(404).send("Event not found");
//             }
//         } catch (error) {
//             res.status(404).json({
//                 success: false,
//                 message: "Unable to update the event",
//                 data: error,
//             });
//             console.log(error);
//         }
//     }

//     async deleteEvent(req, res) {
//         try {
//             const eventId = req.params.id;
//             const event = await eventModel.findById(eventId);
            
//             if (!event) {
//                 return res.status(404).send("Event not found");
//             }
            
//             await eventModel.findByIdAndDelete(eventId);
//             return res.redirect("/admin/allevents");
//         } catch (error) {
//             console.log(error);
//             res.status(500).send("Error deleting event");
//         }
//     }

//     async visitorsallEvents(req, res) {
//         try {
            
//             const allevents = await eventModel.find()
//             res.render("visitorallevents", {
//                 allevents,
//             });
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     async vistiorsEventById(req, res) {
//         try {
//             const paramsId = req.params.id;
//             const event = await eventModel.findById(paramsId);
//             res.render('visitersshowevent', {
//                 event
//             });
//         } catch (error) { 
//             res.status(404).json({
//                 success: false,
//                 message: "unable to find the event",
//                 data: error,
//             });
//             console.log(error);  
//         }
//     }

//     async searchEventsByTitle(req, res) {
//         try {
//             const searchTitle = req.body.title;
//             console.log(searchTitle);
            
//             // Using regex for case-insensitive partial matching
//             const events = await eventModel.find({
//                 title: { $regex: searchTitle, $options: 'i' }
//             }).populate('category', 'name');
            
//             res.render("search", {
//                 events,
//                 searchQuery: searchTitle
//             });
//         } catch (error) {
//             console.error("Error searching for events:", error);
//             res.status(500).send("Error searching for events: " + error.message);
//         }
//     }
    

// }

// module.exports = new eventController();



const eventModel = require("../models/eventsModel");
const Category = require("../models/categoryModel"); 

class eventController {
    async create(req, res) {
        try {
            const categories = await Category.find();
            res.render('addanevent', { categories });
        } catch (err) {
            throw err;
        }
    }

    async addanEvent(req, res) {
        try {
            const { title, description, category, eventDate, organizerName } = req.body;
            const image = req.file?.filename;

            if (!title) {
                console.log("title is Required");
                return res.status(400).send("Name is Required");
            }

            let addEvent = await eventModel.create({
                title,
                description,
                category, 
                eventDate,
                organizerName,
                image,
            });

            if (addEvent) {
                console.log("Event Created Successfully", addEvent);
                return res.redirect("/admin/allevents");
            }
        } catch (error) {
            console.error("Error creating event:", error);
            return res.status(500).send("Error creating event: " + error.message);
        }
    }


    // async updateStatus(req, res) {
    //     try {
    //       const eventId = req.params.id;
    //       const product = await eventModel.findById(eventId);
          
    //       if (!product) {
    //         return res.status(404).json({
    //           success: false,
    //           message: "Product not found"
    //         });
    //       };
    //       const newStatus = Category.status === 'active' ? 'inactive' : 'active';
    //       const updatedProduct = await productModel.findByIdAndUpdate(
    //         userId,
            
    //         {status:newStatus},
    //         { new: true }
    //       );
          
    //       res.status(200).json({
    //         success: true,
    //         message: "Status updated successfully",
    //         data: updatedProduct
    //       });
          
    //     } catch (error) {
    //       console.log(error);
    //       res.status(500).json({
    //         success: false,
    //         message: "Error updating status"
    //       });
    //     }
    //   }


    // async allEvents(req, res) {
    //     try {
            
    //         // const allevents = await eventModel.find().populate('category');
    //         const allevents = await eventModel.aggregate([
    //             {
    //                 $match:{
    //                     //  if required conditions are given
    //                 }
    //             },
    //             {
    //                 $lookup:{
    //                     from:"categories",
    //                     localField:"category",
    //                     foreignField:"_id",
    //                     as:"categoryDetails",

    //                 }
    //             },
    //             {
    //                 $unwind: "$categoryDetails"
    //             },
    //             {
    //                 $project:{
    //                     title:1,
    //                     eventDate:1,
    //                     organizerName:1,
    //                     image:1,
    //                 }
    //             }
    //         ])
            
               

    //         console.log(allevents)
            
    //         res.render("allevents", {
    //             allevents,
    //         });
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).send("Error fetching events");
    //     }
    // }
    async allEvents(req, res) {
        try {
          const allevents = await eventModel.aggregate([
            
            {
              $lookup: {
                from: "categories", 
                localField: "category",
                foreignField: "_id",
                as: "categoryDetails",
              }
            },
        
            {
              $unwind: {
                path: "$categoryDetails",
                
              }
            },
            {
              $project: {
                title: 1,
                eventDate: 1,
                organizerName: 1,
                image: 1,
                categoryDetails: 1,
                "categoryName": "$categoryDetails.title",
                
              }
            }
          ]);
      
          console.log(allevents);
          
          res.render("allevents", {
            allevents,
          });
        } catch (error) {
          console.log(error);
          res.status(500).send("Error fetching events");
        }
      };

    async editEventById(req, res) {
        try {
            const eventId = req.params.id;
            const editEventData = await eventModel.findById(eventId).populate('category');
            
            if (!editEventData) {
                return res.status(404).send("Event not found");
            }

            // Get all categories for the dropdown in edit form
            const categories = await Category.find();

            res.render('editevent', { 
                editEventData,
                categories 
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: "Unable to find the event",
                data: error,
            });
            console.log(error);
        }
    }

    async updateEvent(req, res) {
        try {
            const eventId = req.params.id;
            const { 
                title, 
                description, 
                category, 
                eventDate, 
                organizerName, 
                currentImage 
            } = req.body;
            
            const updateData = {
                title,
                description,
                category,
                eventDate,
                organizerName
            };
            
            if (req.file) {
                updateData.image = req.file.filename;
            }
            
            const updatedEvent = await eventModel.findByIdAndUpdate(
                eventId, 
                updateData,
                { new: true }
            );

            if (updatedEvent) {
                return res.redirect("/admin/allevents");
            } else {
                return res.status(404).send("Event not found");
            }
        } catch (error) {
            res.status(404).json({
                success: false,
                message: "Unable to update the event",
                data: error,
            });
            console.log(error);
        }
    }

    async deleteEvent(req, res) {
        try {
            const eventId = req.params.id;
            const event = await eventModel.findById(eventId);
            
            if (!event) {
                return res.status(404).send("Event not found");
            }
            
            await eventModel.findByIdAndDelete(eventId);
            return res.redirect("/admin/allevents");
        } catch (error) {
            console.log(error);
            res.status(500).send("Error deleting event");
        }
    }

    async visitorsallEvents(req, res) {
        try {
            const allevents = await eventModel.find().populate('category');
            res.render("visitorallevents", {
                allevents,
            });
        } catch (error) {
            console.log(error);
        }
    }

    // async vistiorsEventById(req, res) {
    //     try {
    //         const paramsId = req.params.id;
    //         const event = await eventModel.findById(paramsId).populate('category');
    //         res.render('visitersshowevent', {
    //             event
    //         });
    //     } catch (error) { 
    //         res.status(404).json({
    //             success: false,
    //             message: "unable to find the event",
    //             data: error,
    //         });
    //         console.log(error);  
    //     }
    // }


    async vistiorsEventById(req, res) {
        try {
          const paramsId = req.params.id;
          
          // First find the event to get current status
          const event = await eventModel.findById(paramsId);
          
          if (!event) {
            return res.status(404).json({
              success: false,
              message: "Event not found"
            });
          }

          const newStatus = event.status === 'active' ? 'inactive' : 'active';
          
          
          const updatedEvent = await eventModel.findByIdAndUpdate(
            paramsId,
            { status: newStatus },
            { new: true }
          ).populate('category');
          
        
          res.render('visitersshowevent', {
            event: updatedEvent
          });
          
        } catch (error) {
          res.status(404).json({
            success: false,
            message: "Unable to find the event",
            data: error,
          });
          console.log(error);
        }
      }

    async searchEventsByTitle(req, res) {
        try {
            const searchTitle = req.body.title;
            console.log(searchTitle);
            
            // Using regex for case-insensitive partial matching
            const events = await eventModel.find({
                title: { $regex: searchTitle, $options: 'i' }
            }).populate('category');
            
            res.render("search", {
                events,
                searchQuery: searchTitle
            });
        } catch (error) {
            console.error("Error searching for events:", error);
            res.status(500).send("Error searching for events: " + error.message);
        }
    }
}

module.exports = new eventController();