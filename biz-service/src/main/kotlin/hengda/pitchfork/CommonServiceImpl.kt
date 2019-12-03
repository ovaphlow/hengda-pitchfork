package hengda.pitchfork

import com.google.gson.Gson
import io.grpc.stub.StreamObserver
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.sql.Connection

class CommonServiceImpl: CommonGrpc.CommonImplBase() {
    private val logger: Logger = LoggerFactory.getLogger(CommonServiceImpl::class.java);

    override fun listTrain(req: CommonRequest, responseObserver: StreamObserver<CommonReply>) {
        val gson = Gson()
        val resp: MutableMap<String, Any> = mutableMapOf("message" to "", "content" to "")
        var conn: Connection? = null

        try {
            conn = DBUtil.getConn()
            val sql: String = """
                select *,
                    (select v from public.common_data as cd where cd.id = t.master_id) as model
                from public.train as t
                order by id desc
            """.trimIndent()
            val ps = conn.prepareStatement(sql)
            val rs = ps.executeQuery()
            resp.put("content", DBUtil.getList(rs))
        } catch (e: Exception) {
            e.printStackTrace()
            resp.put("message", "gRPC服务器错误")
        } finally {
            conn!!.close()
        }

        val reply = CommonReply.newBuilder().setData(gson.toJson(resp)).build()
        responseObserver.onNext(reply)
        responseObserver.onCompleted()
    }

    override fun listDept(req: CommonRequest, responseObserver: StreamObserver<CommonReply>) {
        val gson = Gson()
        val resp: MutableMap<String, Any> = mutableMapOf("message" to "", "content" to "")
        var conn: Connection? = null

        try {
            conn = DBUtil.getConn()
            val sql: String = """
                select *,
                    (select v from public.common_data where id = cd.master_id) as dept0
                from public.common_data as cd
                where category = '部门'
                order by id desc
            """.trimIndent()
            val ps = conn.prepareStatement(sql)
            val rs = ps.executeQuery()
            resp.put("content", DBUtil.getList(rs))
        } catch (e: Exception) {
            e.printStackTrace()
            resp.put("message", "gRPC服务器错误")
        } finally {
            conn!!.close()
        }

        val reply = CommonReply.newBuilder().setData(gson.toJson(resp)).build()
        responseObserver.onNext(reply)
        responseObserver.onCompleted()
    }

    override fun listTeam(req: CommonRequest, responseObserver: StreamObserver<CommonReply>) {
        val gson = Gson()
        val resp: MutableMap<String, Any> = mutableMapOf("message" to "", "content" to "")
        var conn: Connection? = null

        try {
            conn = DBUtil.getConn()
            val sql: String = """
                select *,
                    (select v from public.common_data where id = cd.master_id) as dept0
                from public.common_data as cd
                where category = '部门'
                    and k = '班组'
                order by id desc
            """.trimIndent()
            val ps = conn.prepareStatement(sql)
            val rs = ps.executeQuery()
            resp.put("content", DBUtil.getList(rs))
        } catch (e: Exception) {
            e.printStackTrace()
            resp.put("message", "gRPC服务器错误")
        } finally {
            conn!!.close()
        }

        val reply = CommonReply.newBuilder().setData(gson.toJson(resp)).build()
        responseObserver.onNext(reply)
        responseObserver.onCompleted()
    }

    override fun markTeam(req: CommonRequest, responseObserver: StreamObserver<CommonReply>) {
        val gson = Gson()
        val resp: MutableMap<String, Any> = mutableMapOf("message" to "", "content" to "")
        var conn: Connection? = null

        try {
            conn = DBUtil.getConn()
            val sql: String = """
                update public.common_data
                set k = '班组'
                where id = ?
            """.trimIndent()
            val ps = conn.prepareStatement(sql)
            val body = gson.fromJson(req.data.toString(), Map::class.java);
            ps.setInt(1, body["id"].toString().toDouble().toInt())
            ps.execute()
        } catch (e: Exception) {
            e.printStackTrace()
            resp.put("message", "gRPC服务器错误")
        } finally {
            conn!!.close()
        }

        val reply = CommonReply.newBuilder().setData(gson.toJson(resp)).build()
        responseObserver.onNext(reply)
        responseObserver.onCompleted()
    }

    override fun unmark(req: CommonRequest, responseObserver: StreamObserver<CommonReply>) {
        val gson = Gson()
        val resp: MutableMap<String, Any> = mutableMapOf("message" to "", "content" to "")
        var conn: Connection? = null

        try {
            conn = DBUtil.getConn()
            val sql: String = """
                update public.common_data
                set k = ''
                where id = ?
            """.trimIndent()
            val ps = conn.prepareStatement(sql)
            val body = gson.fromJson(req.data.toString(), Map::class.java);
            ps.setInt(1, body["id"].toString().toDouble().toInt())
            ps.execute()
        } catch (e: Exception) {
            e.printStackTrace()
            resp.put("message", "gRPC服务器错误")
        } finally {
            conn!!.close()
        }

        val reply = CommonReply.newBuilder().setData(gson.toJson(resp)).build()
        responseObserver.onNext(reply)
        responseObserver.onCompleted()
    }

    override fun listQc(req: CommonRequest, responseObserver: StreamObserver<CommonReply>) {
        val gson = Gson()
        val resp: MutableMap<String, Any> = mutableMapOf("message" to "", "content" to "")
        var conn: Connection? = null

        try {
            conn = DBUtil.getConn()
            val sql: String = """
                select *,
                    (select v from public.common_data where id = cd.master_id) as dept0
                from public.common_data as cd
                where category = '部门'
                    and k = '质检'
                order by id desc
            """.trimIndent()
            val ps = conn.prepareStatement(sql)
            val rs = ps.executeQuery()
            resp.put("content", DBUtil.getList(rs))
        } catch (e: Exception) {
            e.printStackTrace()
            resp.put("message", "gRPC服务器错误")
        } finally {
            conn!!.close()
        }

        val reply = CommonReply.newBuilder().setData(gson.toJson(resp)).build()
        responseObserver.onNext(reply)
        responseObserver.onCompleted()
    }

    override fun markQc(req: CommonRequest, responseObserver: StreamObserver<CommonReply>) {
        val gson = Gson()
        val resp: MutableMap<String, Any> = mutableMapOf("message" to "", "content" to "")
        var conn: Connection? = null

        try {
            conn = DBUtil.getConn()
            val sql: String = """
                update public.common_data
                set k = '质检'
                where id = ?
            """.trimIndent()
            val ps = conn.prepareStatement(sql)
            val body = gson.fromJson(req.data.toString(), Map::class.java);
            ps.setInt(1, body["id"].toString().toDouble().toInt())
            ps.execute()
        } catch (e: Exception) {
            e.printStackTrace()
            resp.put("message", "gRPC服务器错误")
        } finally {
            conn!!.close()
        }

        val reply = CommonReply.newBuilder().setData(gson.toJson(resp)).build()
        responseObserver.onNext(reply)
        responseObserver.onCompleted()
    }
}