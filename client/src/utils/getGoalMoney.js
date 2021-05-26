const getGoalMoney = (amount) => {
    let goal = 0;
    for (let i = 0; i <= amount; i++) {
        goal += i;
    }
    return goal;
}

export default getGoalMoney;