import { PrismaClient } from '../src/generated/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Función auxiliar para generar fecha aleatoria en rango
function randomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

// Función auxiliar para seleccionar elemento aleatorio
function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// Función auxiliar para generar monto aleatorio
function randomAmount(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
  console.log('🌱 Iniciando seed de base de datos...\n');

  try {
    // Limpiar base de datos
    console.log('🧹 Limpiando base de datos...');
    await prisma.queryAudit.deleteMany();
    await prisma.ingestionRun.deleteMany();
    await prisma.dataset.deleteMany();
    await prisma.user.deleteMany();
    await prisma.contract.deleteMany();
    await prisma.project.deleteMany();
    await prisma.fundingSource.deleteMany();
    await prisma.expenditure.deleteMany();
    await prisma.supplier.deleteMany();
    await prisma.budget.deleteMany();
    await prisma.fiscalYear.deleteMany();
    await prisma.municipality.deleteMany();
    console.log('✅ Base de datos limpiada\n');

    // 1. Crear Municipalidades
    console.log('🏛️  Creando municipalidades...');
    const santiago = await prisma.municipality.create({
      data: {
        name: 'Municipalidad de Santiago',
        country: 'Chile',
        region: 'Región Metropolitana',
        locale: 'es-CL',
        timezone: 'America/Santiago',
      },
    });

    const valparaiso = await prisma.municipality.create({
      data: {
        name: 'Municipalidad de Valparaíso',
        country: 'Chile',
        region: 'Región de Valparaíso',
        locale: 'es-CL',
        timezone: 'America/Santiago',
      },
    });

    const concepcion = await prisma.municipality.create({
      data: {
        name: 'Municipalidad de Concepción',
        country: 'Chile',
        region: 'Región del Biobío',
        locale: 'es-CL',
        timezone: 'America/Santiago',
      },
    });

    console.log(`✅ ${santiago.name} creada`);
    console.log(`✅ ${valparaiso.name} creada`);
    console.log(`✅ ${concepcion.name} creada\n`);

    const municipalities = [santiago, valparaiso, concepcion];

    // 2. Crear Años Fiscales
    console.log('📅 Creando años fiscales...');
    const fiscalYears = await Promise.all(
      [2022, 2023, 2024, 2025].map((year) =>
        prisma.fiscalYear.create({
          data: {
            year,
            status: 'active',
          },
        }),
      ),
    );
    console.log(`✅ ${fiscalYears.length} años fiscales creados\n`);

    // 3. Crear Proveedores
    console.log('🏢 Creando proveedores...');
    const suppliersData = [
      {
        name: 'Constructora Aconcagua SpA',
        taxId: '76.123.456-7',
        sector: 'Construcción',
        locality: 'Santiago',
      },
      {
        name: 'Ingeniería y Obras del Sur Ltda.',
        taxId: '77.234.567-8',
        sector: 'Construcción',
        locality: 'Concepción',
      },
      {
        name: 'Servicios de Aseo Metropolitano',
        taxId: '78.345.678-9',
        sector: 'Servicios',
        locality: 'Santiago',
      },
      {
        name: 'Transportes y Logística Chile',
        taxId: '79.456.789-0',
        sector: 'Transporte',
        locality: 'Valparaíso',
      },
      {
        name: 'Tecnología e Innovación S.A.',
        taxId: '80.567.890-1',
        sector: 'Tecnología',
        locality: 'Santiago',
      },
      {
        name: 'Soluciones Educativas Chile',
        taxId: '81.678.901-2',
        sector: 'Educación',
        locality: 'Valparaíso',
      },
      {
        name: 'Servicios de Salud Integral',
        taxId: '82.789.012-3',
        sector: 'Salud',
        locality: 'Santiago',
      },
      {
        name: 'Constructora del Biobío',
        taxId: '83.890.123-4',
        sector: 'Construcción',
        locality: 'Concepción',
      },
      {
        name: 'Equipamiento Deportivo Pro',
        taxId: '84.901.234-5',
        sector: 'Deportes',
        locality: 'Santiago',
      },
      {
        name: 'Mantención y Servicios Urbanos',
        taxId: '85.012.345-6',
        sector: 'Servicios',
        locality: 'Valparaíso',
      },
      {
        name: 'Ingeniería Vial del Norte',
        taxId: '86.123.456-7',
        sector: 'Construcción',
        locality: 'Santiago',
      },
      {
        name: 'Suministros de Oficina Total',
        taxId: '87.234.567-8',
        sector: 'Comercio',
        locality: 'Santiago',
      },
      {
        name: 'Iluminación y Electricidad',
        taxId: '88.345.678-9',
        sector: 'Servicios',
        locality: 'Concepción',
      },
      {
        name: 'Reciclaje y Medio Ambiente SpA',
        taxId: '89.456.789-0',
        sector: 'Servicios',
        locality: 'Valparaíso',
      },
      {
        name: 'Seguridad Municipal Integral',
        taxId: '90.567.890-1',
        sector: 'Seguridad',
        locality: 'Santiago',
      },
      {
        name: 'Cultura y Eventos Chile',
        taxId: '91.678.901-2',
        sector: 'Cultura',
        locality: 'Santiago',
      },
      {
        name: 'Pavimentos y Asfaltos del Sur',
        taxId: '92.789.012-3',
        sector: 'Construcción',
        locality: 'Concepción',
      },
      {
        name: 'Mobiliario Urbano y Señalética',
        taxId: '93.890.123-4',
        sector: 'Comercio',
        locality: 'Valparaíso',
      },
      {
        name: 'Jardinería y Áreas Verdes',
        taxId: '94.901.234-5',
        sector: 'Servicios',
        locality: 'Santiago',
      },
      {
        name: 'Construcciones Metálicas Chile',
        taxId: '95.012.345-6',
        sector: 'Construcción',
        locality: 'Santiago',
      },
      {
        name: 'Servicio de Alimentación Escolar',
        taxId: '96.123.456-7',
        sector: 'Alimentación',
        locality: 'Concepción',
      },
      {
        name: 'Telecomunicaciones Municipales',
        taxId: '97.234.567-8',
        sector: 'Tecnología',
        locality: 'Valparaíso',
      },
      {
        name: 'Consultoría y Proyectos Urbanos',
        taxId: '98.345.678-9',
        sector: 'Consultoría',
        locality: 'Santiago',
      },
      {
        name: 'Limpieza de Espacios Públicos',
        taxId: '99.456.789-0',
        sector: 'Servicios',
        locality: 'Santiago',
      },
      {
        name: 'Pinturas y Revestimientos SA',
        taxId: '76.567.890-1',
        sector: 'Construcción',
        locality: 'Valparaíso',
      },
      {
        name: 'Hormigones y Áridos del Centro',
        taxId: '77.678.901-2',
        sector: 'Construcción',
        locality: 'Santiago',
      },
      {
        name: 'Sistemas de Seguridad Electrónica',
        taxId: '78.789.012-3',
        sector: 'Tecnología',
        locality: 'Concepción',
      },
      {
        name: 'Capacitación y Desarrollo Municipal',
        taxId: '79.890.123-4',
        sector: 'Educación',
        locality: 'Santiago',
      },
      {
        name: 'Servicios Veterinarios Municipales',
        taxId: '80.901.234-5',
        sector: 'Salud',
        locality: 'Valparaíso',
      },
      {
        name: 'Gestión de Residuos Sólidos',
        taxId: '81.012.345-6',
        sector: 'Servicios',
        locality: 'Concepción',
      },
    ];

    const suppliers = await Promise.all(
      suppliersData.map((supplier) => prisma.supplier.create({ data: supplier })),
    );
    console.log(`✅ ${suppliers.length} proveedores creados\n`);

    // 4. Crear Fuentes de Financiamiento
    console.log('💰 Creando fuentes de financiamiento...');
    const fundingSourcesData = [
      {
        name: 'Presupuesto Municipal',
        type: 'municipal',
        description: 'Recursos propios de la municipalidad',
      },
      {
        name: 'FNDR - Fondo Nacional de Desarrollo Regional',
        type: 'regional',
        description: 'Financiamiento del Gobierno Regional',
      },
      {
        name: 'SUBDERE',
        type: 'national',
        description: 'Subsecretaría de Desarrollo Regional y Administrativo',
      },
      {
        name: 'PMU - Programa de Mejoramiento Urbano',
        type: 'national',
        description: 'Programa del MINVU',
      },
      {
        name: 'Aporte Privado',
        type: 'private',
        description: 'Financiamiento de empresas privadas',
      },
    ];

    const fundingSources = await Promise.all(
      fundingSourcesData.map((source) =>
        prisma.fundingSource.create({ data: source }),
      ),
    );
    console.log(`✅ ${fundingSources.length} fuentes de financiamiento creadas\n`);

    // 5. Crear Presupuestos
    console.log('📊 Creando presupuestos...');

    const departments = [
      'Educación',
      'Salud',
      'Obras Públicas',
      'Aseo y Ornato',
      'Seguridad Ciudadana',
      'Cultura y Deportes',
    ];

    const programs = [
      'Infraestructura Educativa',
      'Atención Primaria',
      'Construcción y Mantención',
      'Recolección de Residuos',
      'Prevención Delictual',
      'Fomento Cultural',
    ];

    const categories = [
      'Infraestructura',
      'Equipamiento',
      'Servicios',
      'Personal',
      'Mantención',
    ];

    const subcategories = [
      'Construcción de Plazas',
      'Recolección de Residuos',
      'Becas Estudiantiles',
      'Mantención de Alumbrado',
      'Equipamiento Deportivo',
      'Pavimentación de Calles',
      'Infraestructura Sanitaria',
      'Mobiliario Urbano',
      'Sistemas de Información',
      'Capacitación Personal',
      'Eventos Culturales',
      'Mantenimiento de Edificios',
      'Seguridad Pública',
      'Áreas Verdes',
      'Señalética Urbana',
    ];

    const budgets = [];
    const budgetCount = 60;
    const fiscalYears2324 = fiscalYears.filter((fy) =>
      [2023, 2024].includes(fy.year),
    );

    for (let i = 0; i < budgetCount; i++) {
      const municipality = randomElement(municipalities);
      const fiscalYear = randomElement(fiscalYears2324);
      const department = randomElement(departments);
      const program = randomElement(programs);
      const category = randomElement(categories);
      const subcategory = randomElement(subcategories);

      // 20% en UF (CLF), 80% en CLP
      const useCLF = Math.random() < 0.2;
      const currency = useCLF ? 'CLF' : 'CLP';
      const amountPlanned = useCLF
        ? randomAmount(1000, 50000)
        : randomAmount(10000000, 500000000);

      const budget = await prisma.budget.create({
        data: {
          municipalityId: municipality.id,
          fiscalYearId: fiscalYear.id,
          department,
          program,
          category,
          subcategory,
          amountPlanned,
          currency,
          notes: `Presupuesto para ${subcategory} - ${department}`,
        },
      });

      budgets.push(budget);
    }
    console.log(`✅ ${budgets.length} presupuestos creados\n`);

    // 6. Crear Gastos (Expenditures)
    console.log('💸 Creando gastos...');

    const concepts = [
      'Construcción Plaza Los Héroes - Etapa 1',
      'Recolección de residuos sector norte - Enero 2024',
      'Mantención alumbrado público Av. Libertador',
      'Adquisición equipamiento deportivo',
      'Becas estudiantiles primer semestre',
      'Pavimentación calle Manuel Montt',
      'Construcción Plaza Los Héroes - Etapa 2',
      'Recolección de residuos sector sur - Febrero 2024',
      'Mantención de áreas verdes Parque Municipal',
      'Compra de mobiliario escolar',
      'Reparación de veredas centro histórico',
      'Señalética vial Av. Bernardo O\'Higgins',
      'Construcción de multicancha barrio norte',
      'Servicio de alimentación escolar',
      'Mantención de edificios municipales',
      'Recolección de residuos sector centro - Marzo 2024',
      'Implementación sistema de reciclaje',
      'Compra de equipamiento médico posta',
      'Evento cultural Fiestas Patrias',
      'Instalación de cámaras de seguridad',
      'Pavimentación calle Arturo Prat',
      'Mantención alumbrado público sector oriente',
      'Construcción de plaza infantil',
      'Recolección de residuos sector poniente - Abril 2024',
      'Reparación de calzadas Av. España',
      'Compra de insumos escolares',
      'Mantención de vehículos municipales',
      'Servicio de aseo oficinas municipales',
      'Instalación de juegos infantiles',
      'Construcción de ciclovía',
      'Recolección de residuos orgánicos - Mayo 2024',
      'Mantención sistema de alcantarillado',
      'Pintura de fachadas edificios públicos',
      'Compra de computadores para biblioteca',
      'Pavimentación pasajes población sur',
      'Mantención alumbrado Plaza de Armas',
      'Construcción de sede vecinal',
      'Recolección de residuos reciclables - Junio 2024',
      'Reparación de semáforos',
      'Servicio de jardinería parques',
      'Compra de uniformes personal',
      'Instalación de paraderos de buses',
      'Construcción de gimnasio municipal',
      'Recolección de residuos voluminosos - Julio 2024',
      'Mantención de red de agua potable',
      'Compra de libros para biblioteca',
      'Pavimentación estacionamiento municipal',
      'Instalación de luminarias LED',
      'Construcción de centro comunitario',
      'Recolección de residuos hospitalarios - Agosto 2024',
      'Mantención de sistemas eléctricos',
      'Compra de instrumental musical',
      'Reparación de puentes peatonales',
      'Instalación de cámaras en escuelas',
      'Construcción de piscina municipal',
      'Recolección de residuos peligrosos - Septiembre 2024',
      'Mantención de instalaciones deportivas',
      'Compra de equipamiento de cocina',
      'Pavimentación acceso cementerio',
      'Instalación de sistema de riego',
      'Construcción de anfiteatro',
      'Recolección de residuos construcción - Octubre 2024',
      'Mantención de sistema de climatización',
      'Compra de material didáctico',
      'Reparación de barandas y pasamanos',
      'Instalación de señalética turística',
      'Construcción de estacionamiento subterráneo',
      'Recolección de residuos electrónicos - Noviembre 2024',
      'Mantención de ascensores',
      'Compra de equipamiento de seguridad',
      'Pavimentación calle Los Aromos',
      'Instalación de paneles solares',
      'Construcción de mercado municipal',
      'Recolección de residuos jardines - Diciembre 2024',
      'Mantención de red de gas',
      'Compra de herramientas de trabajo',
      'Reparación de techumbres',
      'Instalación de wifi público',
      'Construcción de pasarela peatonal',
      'Limpieza de canales y evacuación',
    ];

    const locations = {
      santiago: 'POINT(-70.6693 -33.4489)',
      valparaiso: 'POINT(-71.6187 -33.0472)',
      concepcion: 'POINT(-73.0444 -36.8201)',
    };

    const expenditures = [];
    const expenditureCount = 80;

    for (let i = 0; i < expenditureCount; i++) {
      const municipality = randomElement(municipalities);
      const fiscalYear = randomElement(fiscalYears2324);

      // Generar fecha dentro del año fiscal
      const startDate = new Date(fiscalYear.year, 0, 1);
      const endDate = new Date(fiscalYear.year, 11, 31);
      const date = randomDate(startDate, endDate);

      const department = randomElement(departments);
      const program = randomElement(programs);
      const category = randomElement(categories);
      const subcategory = randomElement(subcategories);
      const concept = randomElement(concepts);
      const supplier = randomElement(suppliers);

      // 15% en UF (CLF), 85% en CLP
      const useCLF = Math.random() < 0.15;
      const currency = useCLF ? 'CLF' : 'CLP';
      const amountActual = useCLF
        ? randomAmount(500, 30000)
        : randomAmount(5000000, 300000000);

      // 40% con ubicación geográfica
      const hasLocation = Math.random() < 0.4;
      let location = null;
      if (hasLocation) {
        if (municipality.name.includes('Santiago')) {
          location = locations.santiago;
        } else if (municipality.name.includes('Valparaíso')) {
          location = locations.valparaiso;
        } else if (municipality.name.includes('Concepción')) {
          location = locations.concepcion;
        }
      }

      const expenditure = await prisma.expenditure.create({
        data: {
          municipalityId: municipality.id,
          fiscalYearId: fiscalYear.id,
          date,
          department,
          program,
          category,
          subcategory,
          concept,
          amountActual,
          currency,
          supplierId: supplier.id,
          procurementRef: `PROC-${fiscalYear.year}-${String(i + 1).padStart(4, '0')}`,
          location,
        },
      });

      expenditures.push(expenditure);
    }
    console.log(`✅ ${expenditures.length} gastos creados\n`);

    // 7. Crear Proyectos
    console.log('🏗️  Creando proyectos...');

    const projectsData = [
      {
        title: 'Construcción Parque Intercomunal',
        description:
          'Proyecto de construcción de un parque intercomunal con áreas verdes, juegos infantiles y espacios deportivos',
        status: 'in_progress',
        department: 'Obras Públicas',
        category: 'Infraestructura',
        requestedBudget: 450000000,
        approvedBudget: 420000000,
        hasLocation: true,
      },
      {
        title: 'Mejoramiento Veredas Centro Histórico',
        description:
          'Reparación y mejoramiento de veredas en el centro histórico de la ciudad',
        status: 'approved',
        department: 'Obras Públicas',
        category: 'Mantención',
        requestedBudget: 180000000,
        approvedBudget: 180000000,
        hasLocation: true,
      },
      {
        title: 'Implementación Sistema de Reciclaje',
        description:
          'Implementación de sistema integral de reciclaje con puntos de recolección y educación ambiental',
        status: 'in_progress',
        department: 'Aseo y Ornato',
        category: 'Servicios',
        requestedBudget: 85000000,
        approvedBudget: 75000000,
        hasLocation: false,
      },
      {
        title: 'Renovación Plaza de Armas',
        description:
          'Renovación completa de la Plaza de Armas con nuevas áreas verdes y mobiliario urbano',
        status: 'evaluating',
        department: 'Obras Públicas',
        category: 'Infraestructura',
        requestedBudget: 320000000,
        approvedBudget: null,
        hasLocation: true,
      },
      {
        title: 'Centro Comunitario Barrio Norte',
        description:
          'Construcción de un centro comunitario con salas multiuso y biblioteca',
        status: 'idea',
        department: 'Cultura y Deportes',
        category: 'Infraestructura',
        requestedBudget: 280000000,
        approvedBudget: null,
        hasLocation: true,
      },
      {
        title: 'Modernización Alumbrado Público',
        description: 'Reemplazo de luminarias tradicionales por tecnología LED',
        status: 'done',
        department: 'Obras Públicas',
        category: 'Equipamiento',
        requestedBudget: 150000000,
        approvedBudget: 145000000,
        hasLocation: false,
      },
      {
        title: 'Construcción Ciclovía Avenida Principal',
        description:
          'Construcción de ciclovía segregada en la avenida principal de la ciudad',
        status: 'approved',
        department: 'Obras Públicas',
        category: 'Infraestructura',
        requestedBudget: 210000000,
        approvedBudget: 195000000,
        hasLocation: true,
      },
      {
        title: 'Mejoramiento Instalaciones Deportivas',
        description: 'Mejoramiento y ampliación de instalaciones deportivas municipales',
        status: 'in_progress',
        department: 'Cultura y Deportes',
        category: 'Infraestructura',
        requestedBudget: 175000000,
        approvedBudget: 170000000,
        hasLocation: true,
      },
      {
        title: 'Sistema de Cámaras de Seguridad',
        description:
          'Implementación de sistema de cámaras de seguridad en espacios públicos',
        status: 'in_progress',
        department: 'Seguridad Ciudadana',
        category: 'Equipamiento',
        requestedBudget: 95000000,
        approvedBudget: 90000000,
        hasLocation: false,
      },
      {
        title: 'Construcción Posta de Salud Rural',
        description: 'Construcción de nueva posta de salud en sector rural',
        status: 'evaluating',
        department: 'Salud',
        category: 'Infraestructura',
        requestedBudget: 380000000,
        approvedBudget: null,
        hasLocation: true,
      },
      {
        title: 'Reparación Mercado Municipal',
        description: 'Reparación estructural y modernización del mercado municipal',
        status: 'approved',
        department: 'Obras Públicas',
        category: 'Mantención',
        requestedBudget: 220000000,
        approvedBudget: 215000000,
        hasLocation: true,
      },
      {
        title: 'Programa de Becas Estudiantiles',
        description: 'Programa anual de becas para estudiantes de escasos recursos',
        status: 'done',
        department: 'Educación',
        category: 'Servicios',
        requestedBudget: 65000000,
        approvedBudget: 65000000,
        hasLocation: false,
      },
      {
        title: 'Construcción Multicancha Techada',
        description:
          'Construcción de multicancha techada para actividades deportivas comunitarias',
        status: 'idea',
        department: 'Cultura y Deportes',
        category: 'Infraestructura',
        requestedBudget: 155000000,
        approvedBudget: null,
        hasLocation: true,
      },
      {
        title: 'Pavimentación Calles Sector Sur',
        description: 'Pavimentación de calles en sectores vulnerables del sur',
        status: 'evaluating',
        department: 'Obras Públicas',
        category: 'Infraestructura',
        requestedBudget: 340000000,
        approvedBudget: null,
        hasLocation: true,
      },
      {
        title: 'Mejoramiento Red de Alcantarillado',
        description: 'Mejoramiento y expansión de red de alcantarillado',
        status: 'approved',
        department: 'Obras Públicas',
        category: 'Infraestructura',
        requestedBudget: 520000000,
        approvedBudget: 480000000,
        hasLocation: false,
      },
      {
        title: 'Centro Cultural Barrio Histórico',
        description:
          'Restauración de edificio patrimonial para centro cultural comunitario',
        status: 'idea',
        department: 'Cultura y Deportes',
        category: 'Infraestructura',
        requestedBudget: 425000000,
        approvedBudget: null,
        hasLocation: true,
      },
      {
        title: 'Sistema de WiFi Público',
        description: 'Implementación de red de WiFi gratuito en plazas y espacios públicos',
        status: 'in_progress',
        department: 'Obras Públicas',
        category: 'Equipamiento',
        requestedBudget: 45000000,
        approvedBudget: 42000000,
        hasLocation: false,
      },
      {
        title: 'Construcción Gimnasio Municipal',
        description:
          'Construcción de gimnasio municipal con equipamiento completo',
        status: 'evaluating',
        department: 'Cultura y Deportes',
        category: 'Infraestructura',
        requestedBudget: 290000000,
        approvedBudget: null,
        hasLocation: true,
      },
      {
        title: 'Modernización Biblioteca Municipal',
        description:
          'Modernización de biblioteca con nuevos espacios digitales y colecciones',
        status: 'approved',
        department: 'Educación',
        category: 'Equipamiento',
        requestedBudget: 78000000,
        approvedBudget: 75000000,
        hasLocation: true,
      },
      {
        title: 'Instalación Paneles Solares Edificios Públicos',
        description:
          'Instalación de paneles solares en edificios municipales para eficiencia energética',
        status: 'idea',
        department: 'Obras Públicas',
        category: 'Equipamiento',
        requestedBudget: 185000000,
        approvedBudget: null,
        hasLocation: false,
      },
    ];

    const projects = [];
    for (const projectData of projectsData) {
      const municipality = randomElement(municipalities);
      const fundingSource = randomElement(fundingSources);

      // Calcular fechas según estado
      let startDate = null;
      let endDate = null;

      if (
        ['in_progress', 'done'].includes(projectData.status)
      ) {
        startDate = randomDate(new Date(2023, 0, 1), new Date(2024, 5, 30));
      }

      if (projectData.status === 'done') {
        endDate = randomDate(startDate!, new Date(2024, 11, 31));
      } else if (projectData.status === 'in_progress') {
        endDate = randomDate(new Date(2024, 6, 1), new Date(2025, 11, 31));
      }

      let location = null;
      if (projectData.hasLocation) {
        if (municipality.name.includes('Santiago')) {
          location = locations.santiago;
        } else if (municipality.name.includes('Valparaíso')) {
          location = locations.valparaiso;
        } else if (municipality.name.includes('Concepción')) {
          location = locations.concepcion;
        }
      }

      const project = await prisma.project.create({
        data: {
          municipalityId: municipality.id,
          title: projectData.title,
          description: projectData.description,
          status: projectData.status,
          startDate,
          endDate,
          department: projectData.department,
          category: projectData.category,
          requestedBudget: projectData.requestedBudget,
          approvedBudget: projectData.approvedBudget,
          fundingSourceId: fundingSource.id,
          location,
        },
      });

      projects.push(project);
    }
    console.log(`✅ ${projects.length} proyectos creados\n`);

    // 8. Crear Contratos
    console.log('📝 Creando contratos...');

    const contractsData = [
      {
        title: 'Construcción de Centro Comunitario Norte',
        description:
          'Contrato para la construcción de un centro comunitario en el sector norte de la ciudad, incluyendo salas multiuso, biblioteca y espacio deportivo.',
        amount: 350000000,
        status: 'active',
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-12-31'),
        contractNumber: 'CT-2024-001',
      },
      {
        title: 'Mantención de Parques y Plazas',
        description:
          'Contrato anual para el mantenimiento de áreas verdes, poda de árboles, riego y limpieza de parques y plazas municipales.',
        amount: 85000000,
        status: 'active',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        contractNumber: 'CT-2024-002',
      },
      {
        title: 'Reparación de Vías Urbanas',
        description:
          'Reparación y bacheo de calles principales y secundarias, incluyendo señalización vial y demarcación.',
        amount: 120000000,
        status: 'active',
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-07-31'),
        contractNumber: 'CT-2024-003',
      },
      {
        title: 'Suministro de Mobiliario Urbano',
        description:
          'Adquisición e instalación de bancas, basureros, bolardos y otros elementos de mobiliario urbano para espacios públicos.',
        amount: 45000000,
        status: 'completed',
        startDate: new Date('2023-09-01'),
        endDate: new Date('2023-12-31'),
        contractNumber: 'CT-2023-045',
      },
      {
        title: 'Servicio de Recolección de Residuos',
        description:
          'Contrato plurianual para el servicio de recolección, transporte y disposición final de residuos domiciliarios.',
        amount: 450000000,
        status: 'active',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2026-12-31'),
        contractNumber: 'CT-2024-004',
      },
      {
        title: 'Implementación de Señalética Turística',
        description:
          'Diseño, fabricación e instalación de señalética turística en puntos estratégicos de la comuna.',
        amount: 28000000,
        status: 'active',
        startDate: new Date('2024-03-01'),
        endDate: new Date('2024-06-30'),
        contractNumber: 'CT-2024-005',
      },
      {
        title: 'Construcción de Ciclovías Urbanas',
        description:
          'Proyecto de construcción de 5 km de ciclovías conectando principales avenidas y parques.',
        amount: 280000000,
        status: 'active',
        startDate: new Date('2024-02-15'),
        endDate: new Date('2024-11-30'),
        contractNumber: 'CT-2024-006',
      },
      {
        title: 'Remodelación de Biblioteca Municipal',
        description:
          'Remodelación integral de la biblioteca municipal, incluyendo actualización de instalaciones, mobiliario y tecnología.',
        amount: 95000000,
        status: 'in_progress',
        startDate: new Date('2024-01-20'),
        endDate: new Date('2024-08-31'),
        contractNumber: 'CT-2024-007',
      },
    ];

    const contracts = [];
    for (const contractData of contractsData) {
      const municipality = randomElement(municipalities);
      const supplier = randomElement(suppliers);

      const contract = await prisma.contract.create({
        data: {
          municipalityId: municipality.id,
          supplierId: supplier.id,
          title: contractData.title,
          description: contractData.description,
          amount: contractData.amount,
          currency: 'CLP',
          startDate: contractData.startDate,
          endDate: contractData.endDate,
          status: contractData.status,
          contractNumber: contractData.contractNumber,
        },
      });

      contracts.push(contract);
    }

    // Crear contratos adicionales aleatorios
    const additionalContracts = 20;
    const contractStatuses = ['draft', 'active', 'completed', 'terminated', 'cancelled'];
    const contractTitles = [
      'Servicio de Vigilancia',
      'Mantención de Alumbrado Público',
      'Limpieza de Edificios Municipales',
      'Construcción de Cancha Deportiva',
      'Servicio de Tecnología',
      'Reparación de Alcantarillado',
      'Pavimentación de Calles',
      'Instalación de Juegos Infantiles',
      'Construcción de Sede Vecinal',
      'Servicio de Jardinería',
      'Mejoramiento de Plaza',
      'Construcción de Skatepark',
      'Reparación de Puente Peatonal',
      'Instalación de Cámaras de Seguridad',
      'Construcción de Multicancha',
      'Mejoramiento de Vereda',
      'Construcción de Centro Cultural',
      'Reparación de Escuela',
      'Instalación de Paneles Solares',
      'Construcción de Estacionamiento',
    ];

    for (let i = 0; i < additionalContracts; i++) {
      const municipality = randomElement(municipalities);
      const supplier = randomElement(suppliers);
      const status = randomElement(contractStatuses);
      const title = randomElement(contractTitles);

      const startDate = randomDate(new Date('2023-01-01'), new Date('2024-06-30'));
      const durationMonths = randomAmount(3, 24);
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + durationMonths);

      const amount = randomAmount(10000000, 500000000);

      const contract = await prisma.contract.create({
        data: {
          municipalityId: municipality.id,
          supplierId: supplier.id,
          title: `${title} - ${municipality.name.split(' ').pop()}`,
          description: `Contrato para ${title.toLowerCase()} en la comuna de ${municipality.name.split(' ').pop()}.`,
          amount,
          currency: 'CLP',
          startDate,
          endDate,
          status,
          contractNumber: `CT-${startDate.getFullYear()}-${String(i + 100).padStart(3, '0')}`,
        },
      });

      contracts.push(contract);
    }
    console.log(`✅ ${contracts.length} contratos creados\n`);

    // 9. Crear Usuarios
    console.log('👤 Creando usuarios...');

    const passwordHash = await bcrypt.hash('demo123', 10);

    const users = await Promise.all([
      prisma.user.create({
        data: {
          email: 'admin@santiago.cl',
          passwordHash,
          role: 'admin_muni',
          municipalityId: santiago.id,
        },
      }),
      prisma.user.create({
        data: {
          email: 'editor@santiago.cl',
          passwordHash,
          role: 'editor_muni',
          municipalityId: santiago.id,
        },
      }),
      prisma.user.create({
        data: {
          email: 'viewer@santiago.cl',
          passwordHash,
          role: 'viewer_muni',
          municipalityId: santiago.id,
        },
      }),
      prisma.user.create({
        data: {
          email: 'admin@valparaiso.cl',
          passwordHash,
          role: 'admin_muni',
          municipalityId: valparaiso.id,
        },
      }),
    ]);
    console.log(`✅ ${users.length} usuarios creados\n`);

    // Resumen final
    console.log('📈 Resumen de datos creados:');
    console.log(`   - Municipalidades: ${municipalities.length}`);
    console.log(`   - Años Fiscales: ${fiscalYears.length}`);
    console.log(`   - Proveedores: ${suppliers.length}`);
    console.log(`   - Fuentes de Financiamiento: ${fundingSources.length}`);
    console.log(`   - Presupuestos: ${budgets.length}`);
    console.log(`   - Gastos: ${expenditures.length}`);
    console.log(`   - Proyectos: ${projects.length}`);
    console.log(`   - Contratos: ${contracts.length}`);
    console.log(`   - Usuarios: ${users.length}`);
    console.log('\n✅ Seed completado exitosamente!');
    console.log('\n📝 Credenciales de acceso:');
    console.log('   Email: admin@santiago.cl | editor@santiago.cl | viewer@santiago.cl | admin@valparaiso.cl');
    console.log('   Password: demo123');
  } catch (error) {
    console.error('❌ Error durante el seed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
