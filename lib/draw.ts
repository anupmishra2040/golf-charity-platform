export function calculatePrizePool(activeUsers: number, contributionPerUser: number, rolloverAmount = 0) {
  const totalPrizePool = activeUsers * contributionPerUser + rolloverAmount;

  return {
    totalPrizePool,
    fiveMatchPool: totalPrizePool * 0.4,
    fourMatchPool: totalPrizePool * 0.35,
    threeMatchPool: totalPrizePool * 0.25,
  };
}

export function generateRandomWinningNumbers(): number[] {
  const numbers = new Set<number>();
  while (numbers.size < 5) {
    numbers.add(Math.floor(Math.random() * 45) + 1);
  }
  return Array.from(numbers);
}

export function countMatches(entryNumbers: number[], winningNumbers: number[]) {
  const winningSet = new Set(winningNumbers);
  return entryNumbers.filter((n) => winningSet.has(n)).length;
}
