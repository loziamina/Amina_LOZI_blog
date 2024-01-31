import chalk from "chalk";

const log = async ({ req, res, next }) => {
  const now = Date.now();

  await next();

  console.info(
    `${chalk.bgWhite(res.statusCode)} ${chalk.green(req.method)} ${req.url} ${
      Date.now() - now
    }ms`,
  );
};

export default log;
