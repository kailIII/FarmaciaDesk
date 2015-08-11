-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-08-2015 a las 03:16:18
-- Versión del servidor: 5.6.21
-- Versión de PHP: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `bd_farmacia`
--

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `v_add_productos`
--
CREATE TABLE IF NOT EXISTS `v_add_productos` (
`id` int(10) unsigned
,`nombre` varchar(100)
,`descripcion` text
,`tipo` varchar(100)
,`unidad` varchar(100)
,`unidades` int(11)
,`subcategoria_id` int(10) unsigned
,`subcategoria` varchar(100)
,`categoria_id` int(10) unsigned
,`categoria` varchar(100)
);
-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `v_clientes`
--
CREATE TABLE IF NOT EXISTS `v_clientes` (
`id` int(10) unsigned
,`nombre` varchar(100)
,`direccion` text
,`telefono` varchar(10)
,`email` varchar(100)
,`municipio_id` int(10) unsigned
,`farmacia_id` int(10) unsigned
,`municipio` varchar(100)
,`departamento_id` int(10) unsigned
,`departamento` varchar(100)
,`created_at` timestamp
,`deleted_at` timestamp
,`updated_at` timestamp
);
-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `v_compras`
--
CREATE TABLE IF NOT EXISTS `v_compras` (
`id` int(10) unsigned
,`fecha` timestamp
,`factura` varchar(20)
,`lote` varchar(100)
,`vencimiento` date
,`farmacia_id` int(10) unsigned
,`proveedor_id` int(10) unsigned
,`proveedor` varchar(50)
,`detalles` bigint(21)
,`created_at` timestamp
,`deleted_at` timestamp
,`updated_at` timestamp
);
-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `v_compra_detalles`
--
CREATE TABLE IF NOT EXISTS `v_compra_detalles` (
`cantidad` int(11)
,`precio` double(6,2)
,`compra_id` int(10) unsigned
,`laboratorio_id` int(10) unsigned
,`laboratorio` varchar(100)
,`producto_farmacia_id` int(10) unsigned
,`producto` varchar(100)
,`created_at` timestamp
,`deleted_at` timestamp
,`updated_at` timestamp
);
-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `v_dashboard_admin`
--
CREATE TABLE IF NOT EXISTS `v_dashboard_admin` (
`productos` bigint(21)
,`farmacias` bigint(22)
);
-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `v_farmacias`
--
CREATE TABLE IF NOT EXISTS `v_farmacias` (
`id` int(10) unsigned
,`nombre` varchar(100)
,`direccion` text
,`telefono` varchar(10)
,`web` varchar(100)
,`email` varchar(100)
,`activa` tinyint(1)
,`municipio_id` int(10) unsigned
,`municipio` varchar(100)
,`departamento` varchar(100)
,`departamento_id` int(10) unsigned
,`num_sucursales` bigint(21)
,`created_at` timestamp
,`deleted_at` timestamp
,`updated_at` timestamp
);
-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `v_productos`
--
CREATE TABLE IF NOT EXISTS `v_productos` (
`id` int(10) unsigned
,`nombre` varchar(100)
,`descripcion` text
,`tipo` varchar(100)
,`unidad` varchar(100)
,`unidades` int(11)
,`subcategoria_id` int(10) unsigned
,`subcategoria` varchar(100)
,`categoria_id` int(10) unsigned
,`categoria` varchar(100)
,`created_at` timestamp
,`deleted_at` timestamp
,`updated_at` timestamp
);
-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `v_productos_farmacia`
--
CREATE TABLE IF NOT EXISTS `v_productos_farmacia` (
`id` int(10) unsigned
,`nombre` varchar(100)
,`descripcion` text
,`unidad` varchar(100)
,`unidades` int(11)
,`tipo` varchar(100)
,`subcategoria` varchar(100)
,`categoria` varchar(100)
,`farmacia_id` int(10) unsigned
,`farmacia` varchar(100)
,`codigo` varchar(20)
,`cantidad` int(11)
,`minimo` int(11)
,`precio` double(6,2)
,`vencimiento` date
,`lote` varchar(100)
,`laboratorio_id` int(10) unsigned
,`laboratorio` varchar(100)
,`lab_vencimiento` int(11)
,`created_at` timestamp
,`deleted_at` timestamp
,`updated_at` timestamp
);
-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `v_productos_sucursal`
--
CREATE TABLE IF NOT EXISTS `v_productos_sucursal` (
`id` int(10) unsigned
,`producto_id` int(10) unsigned
,`nombre` varchar(100)
,`descripcion` text
,`unidad` varchar(100)
,`unidades` int(11)
,`tipo` varchar(100)
,`precio` double(6,2)
,`cantidad` int(11)
,`minimo` int(11)
,`ubicacion` varchar(300)
,`subcategoria` varchar(100)
,`categoria` varchar(100)
,`sucursal_id` int(10) unsigned
,`codigo` varchar(20)
,`farmacia_id` int(10) unsigned
,`vencimiento` date
,`lote` varchar(100)
);
-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `v_proveedores`
--
CREATE TABLE IF NOT EXISTS `v_proveedores` (
`id` int(10) unsigned
,`nombre` varchar(50)
,`direccion` text
,`telefono` varchar(10)
,`email` varchar(100)
,`contacto` varchar(100)
,`tel_contacto` varchar(10)
,`email_contacto` varchar(100)
,`municipio_id` int(10) unsigned
,`farmacia_id` int(10) unsigned
,`municipio` varchar(100)
,`departamento_id` int(10) unsigned
,`departamento` varchar(100)
,`created_at` timestamp
,`deleted_at` timestamp
,`updated_at` timestamp
);
-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `v_requisiciones`
--
CREATE TABLE IF NOT EXISTS `v_requisiciones` (
`id` int(10) unsigned
,`fecha` timestamp
,`sucursal1_id` int(10) unsigned
,`sucursal1` varchar(100)
,`sucursal2_id` int(10) unsigned
,`sucursal2` varchar(100)
,`estado` enum('Enviado','En Proceso','Realizado')
,`farmacia_id` int(10) unsigned
,`farmacia` varchar(100)
,`detalles` bigint(21)
,`created_at` timestamp
,`deleted_at` timestamp
,`updated_at` timestamp
);
-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `v_requisicion_detalles`
--
CREATE TABLE IF NOT EXISTS `v_requisicion_detalles` (
`id` int(10) unsigned
,`cantidad` int(11)
,`requisicion_id` int(10) unsigned
,`nombre` varchar(100)
,`created_at` timestamp
,`deleted_at` timestamp
,`updated_at` timestamp
);
-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `v_sucursales`
--
CREATE TABLE IF NOT EXISTS `v_sucursales` (
`id` int(10) unsigned
,`nombre` varchar(100)
,`direccion` text
,`telefono` varchar(10)
,`email` varchar(100)
,`farmacia_id` int(10) unsigned
,`activa` tinyint(1)
,`farmacia` varchar(100)
,`municipio_id` int(10) unsigned
,`municipio` varchar(100)
,`departamento` varchar(100)
,`departamento_id` int(10) unsigned
,`created_at` timestamp
,`deleted_at` timestamp
,`updated_at` timestamp
);
-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `v_usuarios`
--
CREATE TABLE IF NOT EXISTS `v_usuarios` (
`id` int(10) unsigned
,`user` varchar(50)
,`email` varchar(100)
,`avatar` varchar(100)
,`activo` tinyint(1)
,`sucursal_id` int(10) unsigned
,`sucursal` varchar(100)
,`tipo_usuario_id` int(10) unsigned
,`tipo` varchar(100)
,`farmacia_id` int(10) unsigned
,`farmacia` varchar(100)
,`created_at` timestamp
,`deleted_at` timestamp
,`updated_at` timestamp
);
-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `v_ventas`
--
CREATE TABLE IF NOT EXISTS `v_ventas` (
`id` int(10) unsigned
,`fecha` timestamp
,`factura` varchar(100)
,`nombre` varchar(100)
,`cliente` varchar(100)
,`sucursal_id` int(10) unsigned
,`sucursal` varchar(100)
,`farmacia_id` int(10) unsigned
,`farmacia` varchar(100)
,`detalles` bigint(21)
,`created_at` timestamp
,`deleted_at` timestamp
,`updated_at` timestamp
);
-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `v_venta_detalles`
--
CREATE TABLE IF NOT EXISTS `v_venta_detalles` (
`cantidad` int(11)
,`precio` double(6,2)
,`venta_id` int(10) unsigned
,`producto_sucursal_id` int(10) unsigned
,`producto` varchar(100)
,`created_at` timestamp
,`deleted_at` timestamp
,`updated_at` timestamp
);
-- --------------------------------------------------------

--
-- Estructura para la vista `v_add_productos`
--
DROP TABLE IF EXISTS `v_add_productos`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_add_productos` AS select `p`.`id` AS `id`,`p`.`nombre` AS `nombre`,`p`.`descripcion` AS `descripcion`,`p`.`tipo` AS `tipo`,`p`.`unidad` AS `unidad`,`p`.`unidades` AS `unidades`,`s`.`id` AS `subcategoria_id`,`s`.`nombre` AS `subcategoria`,`c`.`id` AS `categoria_id`,`c`.`nombre` AS `categoria` from ((`productos` `p` join `subcategorias` `s` on((`s`.`id` = `p`.`subcategoria_id`))) join `categorias` `c` on((`c`.`id` = `s`.`categoria_id`))) where (not(`p`.`id` in (select `productos_farmacias`.`producto_id` from `productos_farmacias`)));

-- --------------------------------------------------------

--
-- Estructura para la vista `v_clientes`
--
DROP TABLE IF EXISTS `v_clientes`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_clientes` AS select `c`.`id` AS `id`,`c`.`nombre` AS `nombre`,`c`.`direccion` AS `direccion`,`c`.`telefono` AS `telefono`,`c`.`email` AS `email`,`c`.`municipio_id` AS `municipio_id`,`c`.`farmacia_id` AS `farmacia_id`,`m`.`nombre` AS `municipio`,`d`.`id` AS `departamento_id`,`d`.`nombre` AS `departamento`,`c`.`created_at` AS `created_at`,`c`.`deleted_at` AS `deleted_at`,`c`.`updated_at` AS `updated_at` from ((`clientes` `c` left join `municipios` `m` on((`m`.`id` = `c`.`municipio_id`))) left join `departamentos` `d` on((`d`.`id` = `m`.`departamento_id`)));

-- --------------------------------------------------------

--
-- Estructura para la vista `v_compras`
--
DROP TABLE IF EXISTS `v_compras`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_compras` AS select `c`.`id` AS `id`,`c`.`fecha` AS `fecha`,`c`.`factura` AS `factura`,`c`.`lote` AS `lote`,`c`.`vencimiento` AS `vencimiento`,`c`.`farmacia_id` AS `farmacia_id`,`p`.`id` AS `proveedor_id`,`p`.`nombre` AS `proveedor`,(select count(0) from `detalles_compras` `d` where (`d`.`compra_id` = `c`.`id`)) AS `detalles`,`c`.`created_at` AS `created_at`,`c`.`deleted_at` AS `deleted_at`,`c`.`updated_at` AS `updated_at` from (`compras` `c` join `proveedores` `p` on((`p`.`id` = `c`.`proveedor_id`)));

-- --------------------------------------------------------

--
-- Estructura para la vista `v_compra_detalles`
--
DROP TABLE IF EXISTS `v_compra_detalles`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_compra_detalles` AS select `d`.`cantidad` AS `cantidad`,`d`.`precio` AS `precio`,`d`.`compra_id` AS `compra_id`,`d`.`laboratorio_id` AS `laboratorio_id`,`l`.`nombre` AS `laboratorio`,`d`.`producto_farmacia_id` AS `producto_farmacia_id`,`p`.`nombre` AS `producto`,`d`.`created_at` AS `created_at`,`d`.`deleted_at` AS `deleted_at`,`d`.`updated_at` AS `updated_at` from (((`detalles_compras` `d` join `laboratorios` `l` on((`l`.`id` = `d`.`laboratorio_id`))) join `productos_farmacias` `pf` on((`pf`.`id` = `d`.`producto_farmacia_id`))) join `productos` `p` on((`p`.`id` = `pf`.`producto_id`)));

-- --------------------------------------------------------

--
-- Estructura para la vista `v_dashboard_admin`
--
DROP TABLE IF EXISTS `v_dashboard_admin`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_dashboard_admin` AS select count(0) AS `productos`,(select (count(0) - 1) AS `farmacias` from `farmacias`) AS `farmacias` from `productos`;

-- --------------------------------------------------------

--
-- Estructura para la vista `v_farmacias`
--
DROP TABLE IF EXISTS `v_farmacias`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_farmacias` AS select `f`.`id` AS `id`,`f`.`nombre` AS `nombre`,`f`.`direccion` AS `direccion`,`f`.`telefono` AS `telefono`,`f`.`web` AS `web`,`f`.`email` AS `email`,`f`.`activa` AS `activa`,`m`.`id` AS `municipio_id`,`m`.`nombre` AS `municipio`,`d`.`nombre` AS `departamento`,`d`.`id` AS `departamento_id`,(select count(0) from `sucursales` `s` where (`f`.`id` = `s`.`farmacia_id`)) AS `num_sucursales`,`f`.`created_at` AS `created_at`,`f`.`deleted_at` AS `deleted_at`,`f`.`updated_at` AS `updated_at` from ((`farmacias` `f` left join `municipios` `m` on((`m`.`id` = `f`.`municipio_id`))) left join `departamentos` `d` on((`d`.`id` = `m`.`departamento_id`))) where (`f`.`id` > 1);

-- --------------------------------------------------------

--
-- Estructura para la vista `v_productos`
--
DROP TABLE IF EXISTS `v_productos`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_productos` AS select `p`.`id` AS `id`,`p`.`nombre` AS `nombre`,`p`.`descripcion` AS `descripcion`,`p`.`tipo` AS `tipo`,`p`.`unidad` AS `unidad`,`p`.`unidades` AS `unidades`,`s`.`id` AS `subcategoria_id`,`s`.`nombre` AS `subcategoria`,`c`.`id` AS `categoria_id`,`c`.`nombre` AS `categoria`,`p`.`created_at` AS `created_at`,`p`.`deleted_at` AS `deleted_at`,`p`.`updated_at` AS `updated_at` from ((`productos` `p` left join `subcategorias` `s` on((`s`.`id` = `p`.`subcategoria_id`))) left join `categorias` `c` on((`c`.`id` = `s`.`categoria_id`)));

-- --------------------------------------------------------

--
-- Estructura para la vista `v_productos_farmacia`
--
DROP TABLE IF EXISTS `v_productos_farmacia`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_productos_farmacia` AS select `pf`.`id` AS `id`,`p`.`nombre` AS `nombre`,`p`.`descripcion` AS `descripcion`,`p`.`unidad` AS `unidad`,`p`.`unidades` AS `unidades`,`p`.`tipo` AS `tipo`,`sc`.`nombre` AS `subcategoria`,`c`.`nombre` AS `categoria`,`f`.`id` AS `farmacia_id`,`f`.`nombre` AS `farmacia`,`pf`.`codigo` AS `codigo`,`pf`.`cantidad` AS `cantidad`,`pf`.`minimo` AS `minimo`,`pf`.`precio` AS `precio`,`cp`.`vencimiento` AS `vencimiento`,`cp`.`lote` AS `lote`,`l`.`id` AS `laboratorio_id`,`l`.`nombre` AS `laboratorio`,`l`.`vencimiento` AS `lab_vencimiento`,`pf`.`created_at` AS `created_at`,`pf`.`deleted_at` AS `deleted_at`,`pf`.`updated_at` AS `updated_at` from (((((((`productos_farmacias` `pf` join `productos` `p` on((`p`.`id` = `pf`.`producto_id`))) join `subcategorias` `sc` on((`sc`.`id` = `p`.`subcategoria_id`))) join `categorias` `c` on((`c`.`id` = `sc`.`categoria_id`))) join `farmacias` `f` on((`f`.`id` = `pf`.`farmacia_id`))) left join `detalles_compras` `cd` on((`cd`.`producto_farmacia_id` = `pf`.`id`))) left join `compras` `cp` on((`cp`.`id` = `cd`.`compra_id`))) left join `laboratorios` `l` on((`l`.`id` = `cd`.`laboratorio_id`)));

-- --------------------------------------------------------

--
-- Estructura para la vista `v_productos_sucursal`
--
DROP TABLE IF EXISTS `v_productos_sucursal`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_productos_sucursal` AS select `ps`.`id` AS `id`,`p`.`id` AS `producto_id`,`p`.`nombre` AS `nombre`,`p`.`descripcion` AS `descripcion`,`p`.`unidad` AS `unidad`,`p`.`unidades` AS `unidades`,`p`.`tipo` AS `tipo`,`ps`.`precio` AS `precio`,`ps`.`cantidad` AS `cantidad`,`ps`.`minimo` AS `minimo`,`ps`.`ubicacion` AS `ubicacion`,`sc`.`nombre` AS `subcategoria`,`c`.`nombre` AS `categoria`,`ps`.`sucursal_id` AS `sucursal_id`,`pf`.`codigo` AS `codigo`,`pf`.`farmacia_id` AS `farmacia_id`,`cp`.`vencimiento` AS `vencimiento`,`cp`.`lote` AS `lote` from ((((((`productos_sucursales` `ps` left join `productos_farmacias` `pf` on((`pf`.`id` = `ps`.`producto_farmacia_id`))) left join `productos` `p` on((`p`.`id` = `pf`.`producto_id`))) join `subcategorias` `sc` on((`sc`.`id` = `p`.`subcategoria_id`))) join `categorias` `c` on((`c`.`id` = `sc`.`categoria_id`))) left join `detalles_compras` `cd` on((`cd`.`producto_farmacia_id` = `pf`.`id`))) left join `compras` `cp` on((`cp`.`id` = `cd`.`compra_id`)));

-- --------------------------------------------------------

--
-- Estructura para la vista `v_proveedores`
--
DROP TABLE IF EXISTS `v_proveedores`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_proveedores` AS select `p`.`id` AS `id`,`p`.`nombre` AS `nombre`,`p`.`direccion` AS `direccion`,`p`.`telefono` AS `telefono`,`p`.`email` AS `email`,`p`.`contacto` AS `contacto`,`p`.`tel_contacto` AS `tel_contacto`,`p`.`email_contacto` AS `email_contacto`,`p`.`municipio_id` AS `municipio_id`,`p`.`farmacia_id` AS `farmacia_id`,`m`.`nombre` AS `municipio`,`d`.`id` AS `departamento_id`,`d`.`nombre` AS `departamento`,`p`.`created_at` AS `created_at`,`p`.`deleted_at` AS `deleted_at`,`p`.`updated_at` AS `updated_at` from ((`proveedores` `p` left join `municipios` `m` on((`m`.`id` = `p`.`municipio_id`))) left join `departamentos` `d` on((`d`.`id` = `m`.`departamento_id`)));

-- --------------------------------------------------------

--
-- Estructura para la vista `v_requisiciones`
--
DROP TABLE IF EXISTS `v_requisiciones`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_requisiciones` AS select `r`.`id` AS `id`,`r`.`fecha` AS `fecha`,`r`.`sucursal1_id` AS `sucursal1_id`,`s1`.`nombre` AS `sucursal1`,`r`.`sucursal2_id` AS `sucursal2_id`,`s2`.`nombre` AS `sucursal2`,`r`.`estado` AS `estado`,`f`.`id` AS `farmacia_id`,`f`.`nombre` AS `farmacia`,(select count(`d`.`id`) from `detalles_requisiciones` `d` where (`d`.`requisicion_id` = `r`.`id`)) AS `detalles`,`r`.`created_at` AS `created_at`,`r`.`deleted_at` AS `deleted_at`,`r`.`updated_at` AS `updated_at` from (((`requisiciones` `r` join `sucursales` `s1` on((`s1`.`id` = `r`.`sucursal1_id`))) join `sucursales` `s2` on((`s2`.`id` = `r`.`sucursal2_id`))) join `farmacias` `f` on((`f`.`id` = `s1`.`farmacia_id`)));

-- --------------------------------------------------------

--
-- Estructura para la vista `v_requisicion_detalles`
--
DROP TABLE IF EXISTS `v_requisicion_detalles`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_requisicion_detalles` AS select `dr`.`id` AS `id`,`dr`.`cantidad` AS `cantidad`,`dr`.`requisicion_id` AS `requisicion_id`,`p`.`nombre` AS `nombre`,`dr`.`created_at` AS `created_at`,`dr`.`deleted_at` AS `deleted_at`,`dr`.`updated_at` AS `updated_at` from (((`detalles_requisiciones` `dr` join `productos_sucursales` `ps` on((`ps`.`id` = `dr`.`producto_sucursal_id`))) join `productos_farmacias` `pf` on((`pf`.`id` = `ps`.`producto_farmacia_id`))) join `productos` `p` on((`p`.`id` = `pf`.`producto_id`)));

-- --------------------------------------------------------

--
-- Estructura para la vista `v_sucursales`
--
DROP TABLE IF EXISTS `v_sucursales`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_sucursales` AS select `s`.`id` AS `id`,`s`.`nombre` AS `nombre`,`s`.`direccion` AS `direccion`,`s`.`telefono` AS `telefono`,`s`.`email` AS `email`,`s`.`farmacia_id` AS `farmacia_id`,`s`.`activa` AS `activa`,`f`.`nombre` AS `farmacia`,`s`.`municipio_id` AS `municipio_id`,`m`.`nombre` AS `municipio`,`d`.`nombre` AS `departamento`,`d`.`id` AS `departamento_id`,`s`.`created_at` AS `created_at`,`s`.`deleted_at` AS `deleted_at`,`s`.`updated_at` AS `updated_at` from (((`sucursales` `s` join `farmacias` `f` on((`f`.`id` = `s`.`farmacia_id`))) left join `municipios` `m` on((`m`.`id` = `s`.`municipio_id`))) left join `departamentos` `d` on((`d`.`id` = `m`.`departamento_id`)));

-- --------------------------------------------------------

--
-- Estructura para la vista `v_usuarios`
--
DROP TABLE IF EXISTS `v_usuarios`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_usuarios` AS select `u`.`id` AS `id`,`u`.`user` AS `user`,`u`.`email` AS `email`,`u`.`avatar` AS `avatar`,`u`.`activo` AS `activo`,`u`.`sucursal_id` AS `sucursal_id`,`s`.`nombre` AS `sucursal`,`u`.`tipo_usuario_id` AS `tipo_usuario_id`,`t`.`definicion` AS `tipo`,`f`.`id` AS `farmacia_id`,`f`.`nombre` AS `farmacia`,`u`.`created_at` AS `created_at`,`u`.`deleted_at` AS `deleted_at`,`u`.`updated_at` AS `updated_at` from (((`users` `u` join `sucursales` `s` on((`s`.`id` = `u`.`sucursal_id`))) join `farmacias` `f` on((`f`.`id` = `s`.`farmacia_id`))) join `tipo_usuarios` `t` on((`t`.`id` = `u`.`tipo_usuario_id`)));

-- --------------------------------------------------------

--
-- Estructura para la vista `v_ventas`
--
DROP TABLE IF EXISTS `v_ventas`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_ventas` AS select `v`.`id` AS `id`,`v`.`fecha` AS `fecha`,`v`.`factura` AS `factura`,`t`.`nombre` AS `nombre`,`c`.`nombre` AS `cliente`,`v`.`sucursal_id` AS `sucursal_id`,`s`.`nombre` AS `sucursal`,`f`.`id` AS `farmacia_id`,`f`.`nombre` AS `farmacia`,(select count(0) from `detalles_ventas` `d` where (`d`.`venta_id` = `v`.`id`)) AS `detalles`,`v`.`created_at` AS `created_at`,`v`.`deleted_at` AS `deleted_at`,`v`.`updated_at` AS `updated_at` from ((((`ventas` `v` join `sucursales` `s` on((`s`.`id` = `v`.`sucursal_id`))) join `farmacias` `f` on((`f`.`id` = `s`.`farmacia_id`))) join `tipos_factura` `t` on((`t`.`id` = `v`.`tipo_factura_id`))) join `clientes` `c` on((`c`.`id` = `v`.`cliente_id`)));

-- --------------------------------------------------------

--
-- Estructura para la vista `v_venta_detalles`
--
DROP TABLE IF EXISTS `v_venta_detalles`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_venta_detalles` AS select `d`.`cantidad` AS `cantidad`,`d`.`precio` AS `precio`,`d`.`venta_id` AS `venta_id`,`d`.`producto_sucursal_id` AS `producto_sucursal_id`,`p`.`nombre` AS `producto`,`d`.`created_at` AS `created_at`,`d`.`deleted_at` AS `deleted_at`,`d`.`updated_at` AS `updated_at` from ((`detalles_ventas` `d` join `productos_farmacias` `pf` on((`pf`.`id` = `d`.`producto_sucursal_id`))) join `productos` `p` on((`p`.`id` = `pf`.`producto_id`)));

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
