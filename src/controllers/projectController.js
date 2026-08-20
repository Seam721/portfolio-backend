const {

    createProject,

    getProjects,

    getFeaturedProjects,

    getProjectById,

    updateProject,

    deleteProject

} = require("../models/projectModel");



// =====================================================
// CREATE PROJECT
// =====================================================

const addProject = async (req, res) => {

    try {

        const project =
            await createProject(req.body);


        res.status(201).json({

            success: true,

            message:
                "Project created successfully",

            data: project

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



// =====================================================
// GET ALL PROJECTS
// =====================================================

const getAllProjects = async (req, res) => {

    try {

        const projects =
            await getProjects();


        res.json({

            success: true,

            data: projects

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



// =====================================================
// GET FEATURED PROJECTS
// =====================================================

const getFeatured = async (req, res) => {

    try {

        const projects =
            await getFeaturedProjects();


        res.json({

            success: true,

            data: projects

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



// =====================================================
// GET SINGLE PROJECT
// =====================================================

const getSingleProject = async (req, res) => {

    try {

        const project =
            await getProjectById(
                req.params.id
            );


        if (!project) {

            return res.status(404).json({

                success: false,

                message:
                    "Project not found"

            });

        }


        res.json({

            success: true,

            data: project

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



// =====================================================
// UPDATE PROJECT
// =====================================================

const editProject = async (req, res) => {

    try {

        const project =
            await updateProject(
                req.params.id,
                req.body
            );


        if (!project) {

            return res.status(404).json({

                success: false,

                message:
                    "Project not found"

            });

        }


        res.json({

            success: true,

            message:
                "Project updated successfully",

            data: project

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



// =====================================================
// DELETE PROJECT
// =====================================================

const removeProject = async (req, res) => {

    try {

        await deleteProject(
            req.params.id
        );


        res.json({

            success: true,

            message:
                "Project deleted successfully"

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



// =====================================================
// EXPORT
// =====================================================

module.exports = {

    addProject,

    getAllProjects,

    getFeatured,

    getSingleProject,

    editProject,

    removeProject

};