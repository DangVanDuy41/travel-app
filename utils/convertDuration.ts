export const convertDuration = (duration: number) => {
    const durationInHours = duration / 3600;

    // Chuyển đổi sang định dạng hh:mm:ss
    const hours = Math.floor(durationInHours); 
    const minutes = Math.floor((durationInHours - hours) * 60); 
   

    // Format thành chuỗi hh:mm:ss
    return `${hours.toString().padStart(2, '0')}h${minutes.toString().padStart(2, '0')}p`;
}

