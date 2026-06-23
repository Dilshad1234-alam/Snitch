import { Router } from 'express'
import { validateLoginUser, validateRegisterUser } from '../validator/auth.validator.js'
import { getMe, googleCallback, login, logout, register } from '../controllers/auth.controller.js';
import passport from 'passport';
import { config } from '../config/config.js'
import { authenticateUser } from '../middlewares/auth.middleware.js';


const router = Router()

// /api/auth/register
router.post('/register', validateRegisterUser, register )

// /api/auth/login
router.post("/login", validateLoginUser, login )


// /api/auth/google
router.get("/google", (req, res, next) => {
    const redirect = req.query.redirect || "/";

    passport.authenticate("google", {
        scope: ["profile", "email"],
        state: redirect
    })(req, res, next);
});

router.get("/google/callback", 
    passport.authenticate("google", { 
        session: false,
        failureRedirect: config.NODE_ENV == "production" ? `${config.FRONTEND_URL}` : "/login"
    }),
    googleCallback,
)


router.post("/logout", logout);


/**
 * @route GET /api/auth/me 
 * @description Get the authenticated user's profile
 * @access Private
 */
router.get("/me", authenticateUser, getMe)


export default router;
