$(document).ready(function () {
    $("#searchForm").submit(function (event) {
        event.preventDefault();

        // Capturar la información ingresada
        const heroId = $("#heroName").val();

        // Validar que la información sea un número
        if (!isNaN(heroId)) {
            // Consultar la API
            consultarSuperheroe(heroId);
        } else {
            alert("Por favor, ingresa un número válido.");
        }
    });

    function consultarSuperheroe(id) {
        const apiUrl = `https://www.superheroapi.com/api.php/4905856019427443/${id}`;

        // Realizar la solicitud con AJAX
        $.ajax({
            url: apiUrl,
            type: "GET",
            dataType: "json",
            success: function (data) {
                // Renderizar la información recibida
                mostrarInformacion(data);

                // Emplear la librería de gráficos CanvasJS
                mostrarGrafico(data.powerstats, data.name);

                // Crear la tarjeta con la información relevante
                const cardHtml = `
                    <div class="card text-center">
                        <img src="${data.image.url}" class="card-img-top" alt="${data.name}">
                        <div class="card-body">
                            <h5 class="card-title">${data.name}</h5>
                            <p class="card-text"><strong>Biography:</strong> ${data.biography['full-name']}</p>
                            <p class="card-text"><strong>Alter Egos:</strong> ${data.biography['alter-egos']}</p>
                            <p class="card-text"><strong>Aliases:</strong> ${data.biography['aliases']}</p>
                            <p class="card-text"><strong>Place of birth:</strong> ${data.biography['place-of-birth']}</p>
                            <p class="card-text"><strong>First appearance:</strong> ${data.biography['first-appearance']}</p>
                            <p class="card-text"><strong>Publisher:</strong> ${data.biography['publisher']}</p>
                            <p class="card-text"><strong>Alignment:</strong> ${data.biography['alignment']}</p>
                            <p class="card-text"><strong>Appearance:</strong> ${data.appearance.gender}, ${data.appearance.race}</p>

                            <p class="card-text"><strong>Work:</strong> ${data.work.occupation}</p>
                            <p class="card-text"><strong>Base:</strong> ${data.work.base}</p>
                            <p class="card-text"><strong>Connections:</strong> ${data.connections['group-affiliation']}</p>
                        </div>
                    </div>
                `;

                // Agregar la tarjeta al contenedor deseado (puedes modificar el selector según tu HTML)
                $('#infoContainer').html(cardHtml);
            },
            error: function (error) {
                // Implementar estructuras condicionales para generar alertas cuando existan errores en la búsqueda
                alert("Error en la búsqueda del superhéroe. Por favor, inténtelo de nuevo.");
                console.error("Error en la solicitud:", error);
            }
        });
    }

    function mostrarInformacion(data) {
        // Puedes acceder a diferentes propiedades de 'data' para mostrar la información en tarjetas (card) de Bootstrap
        console.log(data);
        // Aquí puedes procesar la información y mostrarla en tarjetas (card) de Bootstrap
    }

    function mostrarGrafico(powerstats, heroName) {
        // Crear un array de datos para los powerstats
        const powerstatsData = [];
        for (const stat in powerstats) {
            if (powerstats.hasOwnProperty(stat)) {
                powerstatsData.push({ label: stat, y: parseInt(powerstats[stat]) });
            }
        }

        // Configuración del gráfico
        const options = {
            animationEnabled: true,
            title: {
                text: `Powerstats de ${heroName}`
            },
            axisY: {
                title: "Valor",
                includeZero: true
            },
            axisX: {
                title: "Powerstat"
            },
            data: [{
                type: "bar",
                dataPoints: powerstatsData
            }]
        };

        // Renderizar el gráfico utilizando CanvasJS.Chart
        const chart = new CanvasJS.Chart("powerstatsChartContainer", options);
        chart.render();
    }
});

