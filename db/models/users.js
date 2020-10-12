const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    id: { type: mongoose.Schema.Types.ObjectId },

    /* registation details */
    full_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    email_status: { type: String, default: 'unverified' },

    /* general information */
    profile_picture: { type: String, default: '' },
    location: { type: String, default: '' },
    bio: { type: String, default: '' },
    specialization: { type: String, default: '' },
    skills: { type: Array, default: [] },
    interest: { tyep: Array, default: [] },
    is_college_student: { type: Boolean, default: null },
    is_tech_employee: { type: Boolean, default: null },

    /* social profiles */
    social: { github: String, linked: String, twitter: String, website: String },

    /* university details */
    university_details: { name: String, major: String, degree_type: String, graduation_year: String },

    /* project details */
    total_project_count: { type: Number, default: 0 },
    approved_project_count: { type: Number, default: 0 },
    pending_project_count: { type: Number, default: 0 },
    liked_project: { type: Array, defualt: [] },
    saved_project: { type: Array, default: [] },
    code: { type: String }
},
{
    timestamps: true
}
)
module.exports = mongoose.model('User', userSchema)
