export const calculateSafeSequence = () => {
    let finish = [];
    let safeSeq = [];
  
    while (true) {
      let found = false;
      for (let i = 0; i < processes.length; i++) {
        let p = processes[i];
        console.log(`Processing ${p.id}, Allocation length: ${p.allocation.length}`); // Debug log
        let workDone = true;
        for (let j = 0; j < p.allocation.length; j++) {
          if (p.work[j] > p.maxNeed[j]) {
            workDone = false;
            break;
          }
        }
  
        if (workDone) {
          finish.push(p.id);
          safeSeq.push(p.id);
  
          for (let k = 0; k < p.allocation.length; k++) {
            p.work[k] += p.allocation[k];
          }
  
          found = true;
        }
      }
  
      if (!found) {
        break;
      }
    }
  
    return safeSeq;
  };
  