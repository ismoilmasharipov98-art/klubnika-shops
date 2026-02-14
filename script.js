document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Получаем значения из формы
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const kg = document.getElementById('kg').value;
    const comment = document.getElementById('comment').value;
    const city = document.getElementById('city').value;
    const street = document.getElementById('street').value;
    const house = document.getElementById('house').value;
    const entrance = document.getElementById('entrance').value;
    const floor = document.getElementById('floor').value;
    const apartment = document.getElementById('apartment').value;
    const deliveryDate = document.getElementById('deliveryDate').value;
    const deliveryTime = document.getElementById('deliveryTime').value;
    const recipientPhone = document.getElementById('recipientPhone').value;
    
    // Формируем сообщение для Telegram
    const message = `
🍓 НОВЫЙ ЗАКАЗ КЛУБНИКИ 🍓

👤 Имя: ${name}
📞 Телефон: ${phone}
📦 Количество: ${kg} кг
💬 Комментарий: ${comment || 'Нет'}

📍 АДРЕС ДОСТАВКИ:
Город: ${city}
Улица: ${street}
Дом: ${house}
Подъезд: ${entrance || 'Не указан'}
Этаж: ${floor || 'Не указан'}
Квартира: ${apartment || 'Не указана'}

📅 Дата доставки: ${deliveryDate}
⏰ Время: ${deliveryTime}
📞 Телефон получателя: ${recipientPhone}

⏱ Заказ создан: ${new Date().toLocaleString('ru-RU')}
    `;
    
    // Ваш токен бота и chat_id (нужно заменить на свои)
    const botToken = '8487208377:AAEMI1zi-ObuUyinM8C1WgRnj6OvQSKvldA'; // Замените на свой токен
    const chatId = '5463240613'; // Замените на свой chat_id
    
    // Отправка в Telegram
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML'
        })
    })
    .then(response => response.json())
    .then(data => {
        if(data.ok) {
            // Показываем сообщение об успехе
            document.getElementById('successMessage').style.display = 'block';
            // Очищаем форму
            document.getElementById('orderForm').reset();
            // Прокручиваем к сообщению
            document.getElementById('successMessage').scrollIntoView({ behavior: 'smooth' });
            // Скрываем сообщение через 5 секунд
            setTimeout(() => {
                document.getElementById('successMessage').style.display = 'none';
            }, 5000);
        } else {
            alert('Ошибка отправки. Попробуйте позже или позвоните по телефону.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Ошибка отправки. Попробуйте позже.');
    });
});

// Устанавливаем минимальную дату доставки (сегодня)
const today = new Date().toISOString().split('T')[0];
document.getElementById('deliveryDate').min = today;
document.getElementById('deliveryDate').value = today;

// Устанавливаем текущее время + 1 час
const now = new Date();
now.setHours(now.getHours() + 1);
const timeString = now.toTimeString().split(' ')[0].substring(0,5);
document.getElementById('deliveryTime').value = timeString;

// Валидация номера телефона
document.getElementById('phone').addEventListener('input', function(e) {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
    e.target.value = !x[2] ? x[1] : '7' + x[1] + ' (' + x[2] + ') ' + x[3] + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
});