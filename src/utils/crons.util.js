import schedule from "node-schedule";
import db from "../db/models/index.model";
import {Op} from "sequelize";
import moment from "moment";

const allJobs = {};

/**
 * Runs everyday on 05:00 PM
 */
allJobs['removeOldVerificationTokens'] = schedule.scheduleJob('* 17 * * *', async function(){
    console.log("I am about to run");
    await db.userVerification.destroy({
        where: {
            createdAt : {
                [Op.lt]:  moment().subtract(15, 'days').utc()
            }
        }
    })
});


export default allJobs;